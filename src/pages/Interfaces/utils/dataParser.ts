import { InterfaceDataItem, Picture } from "../../../types/interfaces";

export const interfaceDataParser = (
	data: InterfaceDataItem[]
): [InterfaceDataItem[], InterfaceDataItem[]] => {
	const adminData: InterfaceDataItem[] = [];
	const userData: InterfaceDataItem[] = [];

	data.forEach(item => {
		const content = item.content;

		const fixedContent = content.map(contentItem => {
			if (contentItem.pictute) {
				return {
					...contentItem,
					picture: contentItem.pictute as Picture,
				};
			}
			return { ...contentItem };
		});

		if (item.interface_type === "admin") {
			adminData.push({ ...item, content: fixedContent } as InterfaceDataItem);
		}
		if (item.interface_type === "user") {
			userData.push({ ...item, content: fixedContent } as InterfaceDataItem);
		}
	});

	return [
		userData.sort((a, b) => a.order - b.order),
		adminData.sort((a, b) => a.order - b.order),
	];
};
