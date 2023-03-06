import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigModule } from "@nestjs/config";
import { setFfmpegPath } from "fluent-ffmpeg";
import { path } from "@ffmpeg-installer/ffmpeg";

(async () => {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: "http://localhost:3000"
	});
	// app.setGlobalPrefix("api");
	ConfigModule.forRoot({
		envFilePath: `.env.${process.env.NODE_ENV}`
	});
	setFfmpegPath(path);

	await app.listen(5000);
})();
