import * as ytdl from "ytdl-core";

export interface IVideoDetails {
	videoId: string;
	videoUrl: string;
	title: string;
	embed: ytdl.videoInfo["videoDetails"]["embed"];
	thumbnails: ytdl.thumbnail[];
}

export interface IVideoFormat {
	url: string;
	qualityLabel: ytdl.videoFormat["qualityLabel"] | null;
	container: ytdl.videoFormat["container"];
	hasVideo: boolean;
	hasAudio: boolean;
}

export interface IVideoInfo {
	videoDetails: IVideoDetails;
	formats: IVideoFormat[];
}
