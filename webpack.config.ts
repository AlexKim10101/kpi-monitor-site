import { BuildMode, BuildPaths } from "./config/build/types";
import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";

interface EnvVariables {
	mode?: BuildMode;
	analyzer?: boolean;
	port?: number;
	useMock: string;
}

export default (env: EnvVariables) => {
	const useMock = env.useMock === "true";

	const paths: BuildPaths = {
		output: path.resolve(__dirname, "dist"),
		entry: path.resolve(__dirname, "src", "index.tsx"),
		html: path.resolve(__dirname, "public", "index.html"),
		public: path.resolve(__dirname, "public"),
		src: path.resolve(__dirname, "src"),
	};

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		paths,
		analyzer: env.analyzer,
		useMock,
	});
	return config;
};

// return {
// 	entry: "./src/index.tsx",
// 	output: {
// 		path: path.resolve(__dirname, "dist"),
// 		filename: "bundle.[contenthash].js",
// 		clean: true,
// 		publicPath: "/",
// 	},
// 	resolve: {
// 		alias: {
// 			"@assets": path.resolve(__dirname, "src/assets"),
// 			"@components": path.resolve(__dirname, "src/components"),
// 			"@consts": path.resolve(__dirname, "src/consts"),
// 			"@api": path.resolve(__dirname, "src/api"),
// 		},
// 		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
// 	},
// 	devtool: isDev ? "source-map" : false,
// 	module: {
// 		rules: [
// 			{
// 				test: /\.svg$/i,
// 				issuer: /\.[jt]sx?$/,
// 				use: ["@svgr/webpack"],
// 			},
// 			{
// 				test: /\.tsx?$/,
// 				use: "ts-loader",
// 				exclude: /node_modules/,
// 			},
// 			{
// 				enforce: "pre",
// 				test: /\.js$/,
// 				loader: "source-map-loader",
// 			},
// 			{
// 				test: /\.css$/i,
// 				use: ["style-loader", "css-loader"],
// 			},
// 		],
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: "./public/index.html",
// 		}),
// 		new CopyPlugin({
// 			patterns: [
// 				{
// 					from: "public",
// 					to: ".",
// 					filter: (resourcePath: any) => !resourcePath.endsWith("index.html"),
// 				},
// 			],
// 		}),
// 		new webpack.DefinePlugin({
// 			__IS_PROD_BUNDLE_MODE__: JSON.stringify(!isDev),
// 		}),
// 	],
// 	devServer: {
// 		static: {
// 			directory: path.join(__dirname, "public"),
// 		},
// 		historyApiFallback: true,
// 		port: 3000,
// 		open: true,
// 	},
// 	mode: isDev ? "development" : "production",
// };
