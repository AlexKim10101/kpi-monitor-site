import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "./types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";

	return [
		{
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		},

		{
			enforce: "pre",
			test: /\.js$/,
			loader: "source-map-loader",
		},
		{
			test: /\.module\.css$/i,
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						modules: {
							localIdentName: "[local]--[hash:base64:5]",
						},
						esModule: true,
					},
				},
				{
					loader: "postcss-loader",
				},
			],
		},
		{
			test: /\.css$/i,
			exclude: /\.module\.css$/i,
			use: ["style-loader", "css-loader"],
		},

		{
			test: /\.tsx?$/,
			use: "ts-loader",
			exclude: /node_modules/,
		},
		// {
		// 	test: /\.module\.css$/i,
		// 	use: [
		// 		"style-loader",
		// 		{
		// 			loader: "css-loader",
		// 			options: {
		// 				modules: {
		// 					auto: true,
		// 					localIdentName: "[local]--[hash:base64:5]",
		// 					exportOnlyLocals: false,
		// 				},
		// 				esModule: true,
		// 			},
		// 		},
		// 	],
		// },
		// {
		// 	test: /\.css$/i,
		// 	exclude: /\.module\.css$/i,
		// 	use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
		// },
	];
}

// {
// 	test: /\.module\.css$/i, // Добавляем 'i' для case-insensitive
// 	use: [
// 		isDev ? "style-loader" : MiniCssExtractPlugin.loader,
// 		{
// 			loader: "css-loader",
// 			options: {
// 				modules: {
// 					localIdentName: isDev
// 						? "[path][name]__[local]--[hash:base64:5]"
// 						: "[hash:base64:8]",
// 					auto: true, // Важно для CSS Modules
// 					exportLocalsConvention: "camelCase", // Преобразует дефисы в camelCase
// 				},
// 			},
// 		},
// 	],
// },
// return [
// 	assetLoader,
// 	scssLoader,
// 	tsLoader,
// 	// babelLoader,
// 	svgrLoader,
// ];

// const assetLoader = {
// 	test: /\.(png|jpg|jpeg|gif)$/i,
// 	type: "asset/resource",
// };

// const svgrLoader = {
// 	test: /\.svg$/i,
// 	use: [
// 		{
// 			loader: "@svgr/webpack",
// 			options: {
// 				icon: true,
// 				svgoConfig: {
// 					plugins: [
// 						{
// 							name: "convertColors",
// 							params: {
// 								currentColor: true,
// 							},
// 						},
// 					],
// 				},
// 			},
// 		},
// 	],
// };

// const cssLoaderWithModules = {
// 	loader: "css-loader",
// 	options: {
// 		modules: {
// 			localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
// 		},
// 	},
// };

// const scssLoader = {
// 	test: /\.s[ac]ss$/i,
// 	use: [
// 		// Creates `style` nodes from JS strings
// 		isDev ? "style-loader" : MiniCssExtractPlugin.loader,
// 		// Translates CSS into CommonJS
// 		cssLoaderWithModules,
// 		// Compiles Sass to CSS
// 		"sass-loader",
// 	],
// };

// const cssModulesLoader = {
// 	test: /\.module\.css$/i,
// 	use: [
// 		"style-loader",
// 		{
// 			loader: "css-loader",
// 			options: {
// 				modules: {
// 					localIdentName: "[name]__[local]--[hash:base64:5]",
// 					exportLocalsConvention: "camelCaseOnly", // опционально
// 				},
// 			},
// 		},
// 	],
// };

// const tsLoader = {
// 	// ts-loader умеет работать с JSX
// 	// Если б мы не использовали тайпскрипт: нужен был бы babel-loader
// 	exclude: /node_modules/,
// 	test: /\.tsx?$/,
// 	use: [
// 		{
// 			loader: "ts-loader",
// 			options: {
// 				transpileOnly: true,
// 				getCustomTransformers: () => ({
// 					before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
// 				}),
// 			},
// 		},
// 	],
// };
