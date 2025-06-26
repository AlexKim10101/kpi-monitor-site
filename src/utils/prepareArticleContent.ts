import { ArticleContentBlock } from "../types/interfaces";
import { USE_MOCK } from "@consts/consts";

export const prepareContent = (
	blocks: ArticleContentBlock[],
	cardBloks: ArticleContentBlock[]
) => {
	if (USE_MOCK) {
		return blocks.sort((a, b) => a.order - b.order);
	}
	const filtered = blocks.filter(b => !cardBloks.find(c => c.id === b.id));

	const res = [...filtered, ...cardBloks].sort((a, b) => a.order - b.order);

	return res;
};
