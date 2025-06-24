import { ArticleContentBlock } from "../types/interfaces";

export const prepareContent = (
	blocks: ArticleContentBlock[],
	cardBloks: ArticleContentBlock[]
) => {
	const filtered = blocks.filter(b => !cardBloks.find(c => c.id === b.id));

	const res = [...filtered, ...cardBloks].sort((a, b) => a.order - b.order);

	return res;
};
