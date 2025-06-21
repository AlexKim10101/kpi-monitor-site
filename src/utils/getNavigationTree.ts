import { Navigation } from "@api/interfaces";

export type NavigationWithChildren = Navigation & { children: Navigation[] };

export function getNavigationTree(
	navItems: Navigation[]
): NavigationWithChildren[] {
	const parents = navItems
		.filter(el => el.parent === null)
		.sort((a, b) => a.order - b.order);

	const childrenMap = new Map<number, Navigation[]>();

	navItems.forEach(el => {
		if (el.parent) {
			const parentId = el.parent.id;
			if (!childrenMap.has(parentId)) {
				childrenMap.set(parentId, []);
			}
			childrenMap.get(parentId)!.push(el);
		}
	});

	return parents.map(parent => ({
		...parent,
		children: (childrenMap.get(parent.id) || []).sort(
			(a, b) => a.order - b.order
		),
	}));
}
