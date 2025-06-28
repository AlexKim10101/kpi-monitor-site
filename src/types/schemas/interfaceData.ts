import { z } from "zod";

// 🔸 Общие элементы

const PictureSchema = z.object({
	url: z.string(),
	alt: z.string().optional(),
	width: z.number().optional(),
	height: z.number().optional(),
});

// 🔸 Описание (параграф или список)

const ParagraphSchema = z.object({
	type: z.literal("paragraph"),
	children: z.array(
		z.object({
			type: z.literal("text"),
			children: z.array(
				z.object({
					text: z.string(),
					type: z.literal("text"),
				})
			),
		})
	),
});

const ListSchema = z.object({
	type: z.literal("list"),
	children: z.array(
		z.object({
			type: z.literal("list-item"),
			children: z.array(
				z.object({
					text: z.string(),
					type: z.literal("text"),
				})
			),
		})
	),
});

const DescriptionElementSchema = z.union([ParagraphSchema, ListSchema]);

// 🔸 Контент-схемы

const GalleryContentItemSchema = z.object({
	id: z.number(),
	order: z.number(),
	__component: z.literal("type-content.gallery"),
	title: z.string().nullable().optional(),
	description: z.array(DescriptionElementSchema),
	picture_first: z.boolean(),
	picture: PictureSchema,
});

const CardListContentItemSchema = z.object({
	id: z.number(),
	order: z.number(),
	__component: z.literal("type-content.cards"),
	title: z.string(),
	description: z.string(),
	picture: PictureSchema,
});

const PictureContentItemSchema = z.object({
	id: z.number(),
	order: z.number(),
	__component: z.literal("type-content.pictures"),
	picture: PictureSchema,
});

// 🔸 DataItem схемы

const BaseDataItemFields = {
	id: z.number(),
	title: z.string(),
	interface_type: z.union([z.literal("user"), z.literal("admin")]),
	order: z.number(),
	description: z.string().nullable(),
};

const GalleryDataItemSchema = z.object({
	...BaseDataItemFields,
	type_content: z.literal("gallery"),
	content: z.array(GalleryContentItemSchema),
});

const CardsDataItemSchema = z.object({
	...BaseDataItemFields,
	type_content: z.literal("cards"),
	content: z.array(CardListContentItemSchema),
});

const PictureDataItemSchema = z.object({
	...BaseDataItemFields,
	type_content: z.literal("picture"),
	content: z.array(PictureContentItemSchema),
});

// 🔸 Финальный union

export const DataItemSchema = z.discriminatedUnion("type_content", [
	GalleryDataItemSchema,
	CardsDataItemSchema,
	PictureDataItemSchema,
]);

// 🔸 Тип TypeScript
// export type DataItem = z.infer<typeof DataItemSchema>;
