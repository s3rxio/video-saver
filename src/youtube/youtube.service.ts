import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as ytdl from "ytdl-core";
import { IVideoDetails, IVideoFormat, IVideoInfo } from "./youtube.types";
import * as ffmpeg from "fluent-ffmpeg";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class YoutubeService {
	async getVideo(id: string): Promise<IVideoInfo> {
		if (!ytdl.validateID(id))
			throw new HttpException("Bad video id", HttpStatus.BAD_REQUEST);

		const url = "https://youtu.be/" + id;
		const { formats, videoDetails } = await ytdl.getInfo(url);

		const computedVideoDetails: IVideoDetails = {
			videoId: videoDetails.videoId,
			videoUrl: videoDetails.video_url,
			title: videoDetails.title,
			embed: videoDetails.embed,
			thumbnails: videoDetails.thumbnails
		};

		const computedFormats: IVideoFormat[] = formats.map(format => {
			const { url, qualityLabel, container, hasVideo, hasAudio } = format;
			return { url, qualityLabel, container, hasVideo, hasAudio };
		});

		return {
			videoDetails: computedVideoDetails,
			formats: computedFormats
		};
	}

	async concatFormats(formats: IVideoFormat[]): Promise<IVideoFormat> {
		const command = ffmpeg();

		for (const format of formats) command.addInput(format.url);

		if (!fs.existsSync(process.env.OUTPUT_DIR_PATH))
			await fs.mkdirSync(process.env.OUTPUT_DIR_PATH);

		const outputFileName = `${Date.now()}.mp4`;
		const outputPath = path.join(process.env.OUTPUT_DIR_PATH, outputFileName);

		return new Promise<IVideoFormat>((resolve, reject) =>
			command
				.addOption("-c:v copy")
				.save(outputPath)
				.on("error", err => {
					console.error(err);
					reject(
						new HttpException(
							"Internal Server Error",
							HttpStatus.INTERNAL_SERVER_ERROR
						)
					);
				})
				.on("end", () => {
					resolve({
						url: `${process.env.API_URL}/formats/${outputFileName}`,
						qualityLabel: "1080p60",
						container: "mp4",
						hasVideo: true,
						hasAudio: true
					});
				})
		);
	}
}
