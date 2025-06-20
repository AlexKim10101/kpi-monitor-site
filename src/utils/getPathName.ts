export const getPathname = (
	locationsDict: Record<string, string>,
	key: string
) => {
	if (locationsDict.hasOwnProperty(key)) {
		return locationsDict[key];
	}

	return "/empty";
};
