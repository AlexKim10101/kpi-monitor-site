export const PRIMARY_COLOR = "#22409A";
export const SECONDARY_COLOR = "#E1E9FF";
export const FUNCTION_COLOR = "#9EB1E8";
export const ACCENT_COLOR = "#FFD04D";

export const WHITE_COLOR = "#FEFEFF";
export const BLACK_COLOR = "#141414";
export const PRIMARY_HOVER_COLOR = "#0F2978";

export const BG_BLUE_COLOR = "#F8FAFF";
export const BG_GREY_COLOR = "#9EB1E8";

export const ERROR_COLOR = "#FA8989";
export const INACTIVE = "#747474";

export const BASE_URL = "http://85.192.20.139:1338";

export const urls = {
	locales: "http://85.192.20.139:1338/api/i18n/locales",
	buttons: "http://85.192.20.139:1338/api/buttons",
	captions: "http://85.192.20.139:1338/api/captions",
	clients: "http://85.192.20.139:1338/api/clients?populate=logo",
	features: "http://85.192.20.139:1338/api/features?populate=icon",
	news: "http://85.192.20.139:1338/api/news",
	solutions: "http://85.192.20.139:1338/api/solutions?populate=picture",
	functionTypes: "http://85.192.20.139:1338/api/function-types",
	functionBlocks:
		"http://85.192.20.139:1338/api/functions?populate=function_type&populate=function_blocks",
};

export const LOGO_DATA = {
	url: "/icons/kpi_logo.svg",
	to: "https://kpi-monitor.ru",
};

export const SCROLL_LIMIT = 2500;

export const fakeStages = [
	{
		title: "Презентация",
		content: [
			"Удаленная онлайн демонстрация",
			"Очная презентация решений",
			"Специализированный  демо-стенд",
		],
	},
	{
		title: "Аудит",
		content: [
			"Разработанной методологии",
			"Источников данных",
			"Алгоритмов расчетов",
		],
	},
	{
		title: "Внедрение",
		content: [
			"Разработка технического задания",
			"Настройка системы",
			"Развертывание и запуск",
		],
	},
];
