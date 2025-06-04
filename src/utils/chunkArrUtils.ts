export const chunkArray = <T>(arr: T[], size: number): T[][] => {
	if (size <= 0) {
		throw new Error("Размер должен быть больше нуля");
	}

	const result: T[][] = [];

	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}

	return result;
};

export const findChunkIndexById = <T extends { documentId: string }>(
	array: T[],
	chunkSize: number,
	targetId: string
): number => {
	for (let i = 0; i < array.length; i += chunkSize) {
		const chunk = array.slice(i, i + chunkSize);
		if (chunk.some(item => item.documentId === targetId)) {
			return i / chunkSize;
		}
	}

	return 0;
};
