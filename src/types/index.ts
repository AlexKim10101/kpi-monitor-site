type IFormat = {
	width: number;
	height: number;
	size: number;
	url: string;
};

type IPicture = {
	id: number;
	name: string;
	width: number;
	height: number;
	formats: {
		thumbnail: IFormat;
		small: IFormat;
		medium: IFormat;
	};
	url: string;
};

export type ISolutionData = {
	id: number;
	caption: string;
	description: string;
	external_link: string;
	picture: IPicture;
};

export type IFunctionData = {
	id: number;
	title: string;
	description: string;
	icon: {
		id: number;
		name: string;
		width: number;
		height: number;
		url: string;
	};
};
