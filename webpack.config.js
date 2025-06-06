const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// const isDevMode = process.env.NODE_ENV === "development";

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
			alias: {
				"@assets": path.resolve(__dirname, "src/assets"),
				"@components": path.resolve(__dirname, "src/components"),
				"@consts": path.resolve(__dirname, "src/consts"),
				"@api": path.resolve(__dirname, "src/api"),
			},
			extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
		},
		devtool: isDev ? "source-map" : false,
		module: {
			rules: [
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					use: ["@svgr/webpack"],
				},
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
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./public/index.html",
			}),
			new CopyPlugin({
				patterns: [
					{
						from: "public",
						to: ".",
						filter: resourcePath => !resourcePath.endsWith("index.html"),
					},
				],
			}),
			new webpack.DefinePlugin({
				__IS_PROD_BUNDLE_MODE__: JSON.stringify(!isDev),
			}),
		],
		devServer: {
			static: {
				directory: path.join(__dirname, "public"),
			},
			historyApiFallback: true,
			port: 3000,
			open: true,
		},
		mode: isDev ? "development" : "production",
	};
};

// const getHost = () => window.location.origin;
// const urlProduction = getHost();
// export const URL_ADDRESS = __IS_PROD_BUNDLE_MODE__
// 	? urlProduction
// 	: urlDevelopment.cloudKpi2;
