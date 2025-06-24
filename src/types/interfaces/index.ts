export interface PictureFormat {
	width: number;
	height: number;
	size: number;
	url: string;
	[key: string]: any;
}

export interface Picture {
	id: number;
	name: string;
	width: number;
	height: number;
	formats: {
		thumbnail: PictureFormat;
		small: PictureFormat;
		medium: PictureFormat;
		large: PictureFormat;
	};
	url: string;
	[key: string]: any;
}

export interface Icon {
	id: number;
	name: string;
	width: number;
	height: number;
	url: string;
	[key: string]: any;
}

export interface Logo {
	width: number;
	height: number;
	url: string;
	hash: string;
	[key: string]: any;
}

export interface Card {
	description: string;
	logo: Logo;
}

export interface Button {
	id: number;
	caption: string;
	link: string;
}

export type IComponentTypes =
	| "shared.media"
	| "shared.subhead"
	| "shared.rich-text"
	| "shared.callout"
	| "shared.card-block"
	| "shared.button";

export interface BaseBlock<T extends IComponentTypes> {
	__component: T;
	id: number;
	order: number;
}

export interface MediaBlock extends BaseBlock<"shared.media"> {
	file: Picture;
}

export interface SubheadBlock extends BaseBlock<"shared.subhead"> {
	Subhead: string;
}

export interface RichTextBlock extends BaseBlock<"shared.rich-text"> {
	body: string;
}
export interface CalloutBlock extends BaseBlock<"shared.callout"> {
	title: string;
	description: string;
	icon: Icon;
}
export interface CardBlock extends BaseBlock<"shared.card-block"> {
	card: Card[];
}
export interface ButtonBlock extends BaseBlock<"shared.button"> {
	buttons: Button[];
}

type ComponentMap = {
	"shared.media": MediaBlock;
	"shared.subhead": SubheadBlock;
	"shared.rich-text": RichTextBlock;
	"shared.callout": CalloutBlock;
	"shared.card-block": CardBlock;
	"shared.button": ButtonBlock;
};

export type ArticleContentBlock = ComponentMap[keyof ComponentMap];
