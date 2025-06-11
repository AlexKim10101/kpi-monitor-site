import { Configuration } from "webpack";
import path from "path";

import { BuildOptions } from "./types";

export function buildResolvers({
	paths,
}: BuildOptions): Configuration["resolve"] {
	return {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@assets": path.resolve(paths.src, "assets"),
			"@components": path.resolve(paths.src, "components"),
			"@consts": path.resolve(paths.src, "consts"),
			"@api": path.resolve(paths.src, "api"),
		},
	};
}
