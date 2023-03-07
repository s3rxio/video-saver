import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { YoutubeController } from "./youtube/youtube.controller";
import { YoutubeService } from "./youtube/youtube.service";
import { YoutubeModule } from "./youtube/youtube.module";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
	imports: [
		YoutubeModule,
		ConfigModule.forRoot(),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "public")
		})
	],
	controllers: [AppController, YoutubeController],
	providers: [AppService, YoutubeService]
})
export class AppModule {}
