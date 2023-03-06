import { Body, Controller, Get, Header, Param, Post } from "@nestjs/common";
import { YoutubeService } from "./youtube.service";
import { IVideoFormat } from "./youtube.types";

@Controller("youtube")
export class YoutubeController {
	constructor(private youtubeService: YoutubeService) {}

	@Get("video/:id")
	getVideo(
		@Param("id")
		id: string
	) {
		return this.youtubeService.getVideo(id);
	}

	@Get("format/:id")
	// @Header("Content-type", "video/mp4")
	getFormat(@Param("id") id: string) {
		return this.youtubeService.getFormat(id);
	}

	@Post("format/concat")
	concat(@Body() formats: IVideoFormat[]) {
		return this.youtubeService.concatFormats(formats);
	}
}
