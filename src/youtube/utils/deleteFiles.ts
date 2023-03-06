import { unlinkSync } from "fs";

export const deleteFiles = async (...paths: string[]) =>
	paths.forEach(path => unlinkSync(path));
