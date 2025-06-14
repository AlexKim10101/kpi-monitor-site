export type BuildMode = "production" | "development";

export interface BuildPaths {
	entry: string;
	html: string;
	public: string;
	output: string;
	src: string;
}

export interface BuildOptions {
	port: number;
	paths: BuildPaths;
	mode: BuildMode;
	analyzer?: boolean;
	useMock: boolean;
}
