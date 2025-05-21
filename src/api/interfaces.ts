export interface Caption {
	id: number;
	key: string;
	caption: string;
}

interface PictureFormat {
	width: number;
	height: number;
	size: number;
	url: string;
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
}

export interface Solution {
	id: number;
	caption: string;
	description: string;
	external_link: string;
	picture: Picture;
}

export interface Client {
	id: number;
	logo: {
		width: number;
		height: number;
		url: string;
		hash: string;
	};
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
	};
}

export interface News {
	id: number;
	title: string;
	date: string;
}

export interface Operation {
	id: number;
	title: string;
	description: string;
	function_type: {
		id: number;
		point: string;
		title: string;
	};
	function_blocks: {
		id: number;
		title: string;
		description: string;
		order: number;
	}[];
}

const test = {
	id: 6,
	documentId: "bmuuqn4jj1b35b6vyzsbjxbl",
	createdAt: "2025-05-14T11:38:13.918Z",
	updatedAt: "2025-05-14T11:40:03.498Z",
	publishedAt: "2025-05-14T11:40:03.513Z",
	locale: "ru",
	title: "IF",
	description: "условный оператор IF",
	function_type: {
		id: 2,
		documentId: "wzcrxd2ggy6b11670jlbvb2e",
		point: "Операторы",
		title: "Операторы",
		order: 0,
		createdAt: "2025-05-14T11:37:06.375Z",
		updatedAt: "2025-05-14T11:37:07.392Z",
		publishedAt: "2025-05-14T11:37:07.401Z",
		locale: "ru",
	},
	function_blocks: [
		{
			id: 8,
			documentId: "f0wv9558egikl2vxmyeyvfev",
			title: "Синтаксис",
			description:
				"F.IF(bool <выражение1>, float <выражение2>, float <выражение3>)\n* выражение1 - логическое выражение\n* выражение2 - значение, если указанное условие дает в результате значение ИСТИНА\n* выражение3 - значение, если условие дает в результате значение ЛОЖЬ",
			order: 1,
			createdAt: "2025-05-14T11:44:29.828Z",
			updatedAt: "2025-05-14T11:52:47.505Z",
			publishedAt: "2025-05-14T11:52:47.526Z",
			locale: "ru",
		},
		{
			id: 7,
			documentId: "ex9hl3rsszros62iuo3fcvov",
			title: "Описание",
			description:
				"Условный оператор IF возвращает одно значение, если указанное условие дает в результате значение ИСТИНА, и другое значение, если условие дает в результате значение ЛОЖЬ.",
			order: 0,
			createdAt: "2025-05-14T11:39:53.831Z",
			updatedAt: "2025-05-14T11:52:27.027Z",
			publishedAt: "2025-05-14T11:52:27.038Z",
			locale: "ru",
		},
		{
			id: 10,
			documentId: "as1llepqp22309w9clpxpxpb",
			title: "Пример",
			description:
				"F.IF (A > 0, B, 0)\nВозвращается значение B, если A больше 0 или 0, если A меньше или равно 0\n\nF.IF (((А /B) > 1.5) and ((A/B) < 2.3), C, 0)\nВозвращается значение С, если A/В больше 1.5 и меньше 2.3 или 0, если A/В меньше или равно 1.5 и больше или равно 2.3",
			order: 2,
			createdAt: "2025-05-14T12:05:41.173Z",
			updatedAt: "2025-05-14T12:05:41.173Z",
			publishedAt: "2025-05-14T12:05:41.188Z",
			locale: "ru",
		},
	],
};
