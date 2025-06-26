import { ArticleContentBlock, Icon, Logo, Picture } from "../types/interfaces";

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
	logo: Logo;
	[key: string]: any;
}

export interface KeyFunction {
	id: number;
	title: string;
	description: string;
	icon: Icon;
	[key: string]: any;
}

export interface News {
	id: number;
	title: string;
	date: string;
	[key: string]: any;
}

export interface AllNews {
	id: number;
	title: string;
	date: string;
	description: string;
	picture: Picture[];
	[key: string]: any;
}

export interface Articles extends Omit<AllNews, "picture"> {
	content: ArticleContentBlock[];
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
	icon: Icon;
	[key: string]: any;
}

export interface Locale {
	id: number;
	name: string;
	code: string;
	isDefault: boolean;
	[key: string]: any;
}
