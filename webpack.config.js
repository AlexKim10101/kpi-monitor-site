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
			alias: {
				"@assets": path.resolve(__dirname, "src/assets"),
				"@components": path.resolve(__dirname, "src/components"),
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
