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
	[key: string]: any;
}

export interface Button {
	id: number;
	caption: string;
	link: string | null;
	[key: string]: any;
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
	[key: string]: any;
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

type ArticleComponentMap = {
	"shared.media": MediaBlock;
	"shared.subhead": SubheadBlock;
	"shared.rich-text": RichTextBlock;
	"shared.callout": CalloutBlock;
	"shared.card-block": CardBlock;
	"shared.button": ButtonBlock;
};

export type ArticleContentBlock =
	ArticleComponentMap[keyof ArticleComponentMap];

/////

export type Component = "gallery" | "picture" | "cards";

export const COMPONENT_TYPES = {
	GALLERY: "type-content.gallery",
	CARDS: "type-content.cards",
	PICTURES: "type-content.pictures",
} as const;

export type ComponentType =
	(typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];

export type DescriptionElement = Paragraph | List;

export interface Paragraph {
	type: "paragraph";
	children: TextNode[];
}

export interface List {
	type: "list";
	children: ListItem[];
}

export interface TextNode {
	type: "text";
	text: string;
}

export interface ListItem {
	type: "list-item";
	children: TextNode[];
}

interface BaseContentItem {
	id: number;
	order: number;
	[key: string]: any;
}

export interface GalleryContentItem extends BaseContentItem {
	__component: "type-content.gallery";
	title?: string | null;
	description: DescriptionElement[];
	picture_first: boolean;
	picture: Picture;
}

export interface CardListContentItem extends BaseContentItem {
	__component: "type-content.cards";
	title: string;
	description: string;
	picture: Picture;
}

export interface PictureContentItem extends BaseContentItem {
	__component: "type-content.pictures";
	picture: Picture;
}

type ComponentMap = {
	gallery: GalleryContentItem[];
	picture: PictureContentItem[];
	cards: CardListContentItem[];
};

export interface InterfaceDataItem<T extends Component = Component> {
	id: number;
	title: string;
	interface_type: "user" | "admin";
	order: number;
	description: string | null;
	type_content: T;
	content: ComponentMap[T];
}

// export type DescriptionElement = Paragraph | List;

// export interface Paragraph {
// 	type: "paragraph";
// 	children: {
// 		type: "text";
// 		children: { text: string; type: "text" }[];
// 	}[];
// }

// export interface List {
// 	type: "list";
// 	children: {
// 		type: "list-item";
// 		children: { text: string; type: "text" }[];
// 	}[];
// }
