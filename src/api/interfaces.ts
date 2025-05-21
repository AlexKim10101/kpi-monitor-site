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
