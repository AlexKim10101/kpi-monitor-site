const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
	const isDev = argv.mode === "development";

	return {
		entry: "./src/index.tsx",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "bundle.[contenthash].js",
			clean: true,
			publicPath: "/",
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
		devtool: isDev ? "source-map" : false,
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
				{
					enforce: "pre",
					test: /\.js$/,
					loader: "source-map-loader",
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./public/index.html",
			}),
		],
		devServer: {
			static: {
				directory: path.join(__dirname, "dist"),
			},
			historyApiFallback: true,
			port: 3000,
			open: true,
		},
		mode: isDev ? "development" : "production",
	};
};
