import webpack, { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({
	mode,
	paths,
	analyzer,
	useMock,
}: BuildOptions): Configuration["plugins"] {
	const isDev = mode === "development";
	const isProd = mode === "production";

	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, "favicon.svg"),
		}),

		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: paths.entry,
		// 			to: paths.output,
		// 			filter: (resourcePath: string) =>
		// 				!resourcePath.endsWith("index.html"),
		// 		},
		// 	],
		// }),
		new DefinePlugin({
			__IS_PROD_BUNDLE_MODE__: JSON.stringify(!isDev),
			__USE_MOCK__: JSON.stringify(useMock),
		}),
	];

	if (isDev) {
		plugins.push(new webpack.ProgressPlugin());
		/** Выносит проверку типов в отдельный процесс: не нагружая сборку */
		plugins.push(new ForkTsCheckerWebpackPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash:8].css",
				chunkFilename: "css/[name].[contenthash:8].css",
			})
		);
		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: "public",
						to: paths.output,
						filter: (resourcePath: any) => !resourcePath.endsWith("index.html"),
					},
				],
			})
		);
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}
