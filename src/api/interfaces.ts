export interface Navigation {
	id: number;
	key: string;
	caption: string;
	parent: Omit<Navigation, "parent"> | null;
	order: number;
	[key: string]: any;
}

export interface Caption {
	id: number;
	key: string;
	caption: string;
	[key: string]: any;
}

interface PictureFormat {
	width: number;
	height: number;
	size: number;
	url: string;
	[key: string]: any;
}

interface Picture {
	id: number;
	name: string;
	width: number;
	height: number;
	formats: {
		thumbnail: PictureFormat;
		small: PictureFormat;
		medium: PictureFormat;
	};
	url: string;
	[key: string]: any;
}

export interface Solution {
	id: number;
	caption: string;
	description: string;
	external_link: string | null;
	picture: Picture;
	[key: string]: any;
}

export interface Client {
	id: number;
	logo: {
		width: number;
		height: number;
		url: string;
		hash: string;
		[key: string]: any;
	};
	[key: string]: any;
}

export interface KeyFunction {
	id: number;
	title: string;
	description: string;
	icon: {
		id: number;
		name: string;
		width: number;
		height: number;
		url: string;
		[key: string]: any;
	};
	[key: string]: any;
}

export interface News {
	id: number;
	title: string;
	date: string;
	[key: string]: any;
}

export interface Operation {
	id: number;
	documentId: string;
	title: string;
	point: string;
	description?: string | null;
	order: number;
	functions: {
		id: number;
		title: string | null;
		description: string | null;
		function_blocks: {
			id: number;
			title: string | null;
			description: string;
			order: number;
			[key: string]: any;
		}[];
		[key: string]: any;
	}[];
	[key: string]: any;
}

export interface Stage {
	id: number;
	title: string;
	description: string;
	order: number;
	icon: {
		id: number;
		name: string;
		width: number;
		height: number;
		url: string;
		[key: string]: any;
	};
	[key: string]: any;
}

export interface Locale {
	id: number;
	name: string;
	code: string;
	isDefault: boolean;
	[key: string]: any;
}

const stageItem = {
	id: 2,
	title: "Презентация",
	description:
		"Удаленная онлайн демонстрация\nОчная презентация решений\nСпециализированный  демо-стенд",
	order: 1,
	icon: {
		id: 73,
		name: "num.svg",
		width: 44,
		height: 111,
		url: "/uploads/num_698c638912.svg",
	},
};

// const test = {
// 	id: 2,
// 	title: "Операторы",
// 	order: 0,
// 	functions: [
// 		{
// 			id: 15,
// 			title: "AND",
// 			description: "оператор AND",
// 			function_blocks: [
// 				{
// 					id: 3,
// 					title: "Описание",
// 					description:
// 						"Логический оператор AND выполняет условие только в том случае, если в результате вычисления всех аргументов получается значение ИСТИНА. Если хотя бы одно условие ЛОЖНО, то все условие ЛОЖНО. Обычно функция AND используется для расширения возможностей других функций, выполняющих логическую проверку.",
// 					order: 0,
// 				},
// 				{
// 					id: 12,
// 					documentId: "g2oiepryk7vp0bjaqccn8rjy",
// 					title: "Синтаксис",
// 					description:
// 						"(<выражение1>) AND (<выражение2>)\n\n- выражение1 - первое проверяемое условие, вычисление которого дает значение ИСТИНА или ЛОЖЬ.\n- выражение2 - второе проверяемое условие, вычисление которого дает значение ИСТИНА или ЛОЖЬ.",
// 					order: 1,
// 					createdAt: "2025-05-22T10:13:37.287Z",
// 					updatedAt: "2025-05-22T10:13:37.287Z",
// 					publishedAt: "2025-05-22T10:13:37.315Z",
// 					locale: "ru",
// 				},
// 				{
// 					id: 14,
// 					documentId: "xwzhkkqjvf21p2xu9xjtoatg",
// 					title: "Пример",
// 					description:
// 						"F.IF (A > 0 AND B=5, B, 0)\n\nВозвращается значение B, если A>0 и B=5, иначе 0",
// 					order: 2,
// 					createdAt: "2025-05-22T10:14:10.409Z",
// 					updatedAt: "2025-05-22T10:14:10.409Z",
// 					publishedAt: "2025-05-22T10:14:10.428Z",
// 					locale: "ru",
// 				},
// 			],
// 		},
// 		{
// 			id: 16,
// 			documentId: "bmuuqn4jj1b35b6vyzsbjxbl",
// 			createdAt: "2025-05-14T11:38:13.918Z",
// 			updatedAt: "2025-05-22T10:32:16.673Z",
// 			publishedAt: "2025-05-22T10:32:16.701Z",
// 			locale: "ru",
// 			title: "IF",
// 			description: "условный оператор IF",
// 			function_blocks: [
// 				{
// 					id: 7,
// 					documentId: "ex9hl3rsszros62iuo3fcvov",
// 					title: "Описание",
// 					description:
// 						"Условный оператор IF возвращает одно значение, если указанное условие дает в результате значение ИСТИНА, и другое значение, если условие дает в результате значение ЛОЖЬ.",
// 					order: 0,
// 					createdAt: "2025-05-14T11:39:53.831Z",
// 					updatedAt: "2025-05-14T11:52:27.027Z",
// 					publishedAt: "2025-05-14T11:52:27.038Z",
// 					locale: "ru",
// 				},
// 				{
// 					id: 8,
// 					documentId: "f0wv9558egikl2vxmyeyvfev",
// 					title: "Синтаксис",
// 					description:
// 						"F.IF(bool <выражение1>, float <выражение2>, float <выражение3>)\n* выражение1 - логическое выражение\n* выражение2 - значение, если указанное условие дает в результате значение ИСТИНА\n* выражение3 - значение, если условие дает в результате значение ЛОЖЬ",
// 					order: 1,
// 					createdAt: "2025-05-14T11:44:29.828Z",
// 					updatedAt: "2025-05-14T11:52:47.505Z",
// 					publishedAt: "2025-05-14T11:52:47.526Z",
// 					locale: "ru",
// 				},
// 				{
// 					id: 10,
// 					documentId: "as1llepqp22309w9clpxpxpb",
// 					title: "Пример",
// 					description:
// 						"F.IF (A > 0, B, 0)\nВозвращается значение B, если A больше 0 или 0, если A меньше или равно 0\n\nF.IF (((А /B) > 1.5) and ((A/B) < 2.3), C, 0)\nВозвращается значение С, если A/В больше 1.5 и меньше 2.3 или 0, если A/В меньше или равно 1.5 и больше или равно 2.3",
// 					order: 2,
// 					createdAt: "2025-05-14T12:05:41.173Z",
// 					updatedAt: "2025-05-14T12:05:41.173Z",
// 					publishedAt: "2025-05-14T12:05:41.188Z",
// 					locale: "ru",
// 				},
// 			],
// 		},
// 	],
// };
