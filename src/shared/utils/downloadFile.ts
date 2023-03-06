import fetch from "node-fetch-commonjs";
import { writeFileSync } from "fs";

export const downloadFile = async (url: string, path: string) => {
	return fetch(url)
		.then(res => res.arrayBuffer())
		.then(res => {
			writeFileSync(path, Buffer.from(res));
		});
};
