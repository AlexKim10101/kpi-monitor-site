import type { Configuration } from "webpack-dev-server";

import { BuildOptions } from "./types";

export function buildDevServer({ paths, port }: BuildOptions): Configuration {
	return {
		port: port ?? 3000,
		open: true,
		historyApiFallback: true,
		hot: true,
		static: {
			directory: paths.public,
		},
	};
}
