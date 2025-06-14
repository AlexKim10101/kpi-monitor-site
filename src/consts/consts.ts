declare const __USE_MOCK__: boolean;

export const USE_MOCK = __USE_MOCK__;

export const MOCK_URL = "https://kpi-site.profitproject.ru";

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

// export const BASE_URL = "http://213.219.199.45";

export const DEV_BASE_URL = "http://10.0.0.39:1337";
// export const DEV_BASE_URL = "http://213.219.199.45";

export const urls = {
	navigation: "http://85.192.20.139:1338/api/navigations?populate=parent",
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
	stages: "http://85.192.20.139:1338/api/applications?populate=icon",
};

const linkKeys = ["menu_main", "menu_about", "menu_solutions", "main_info"];

export const locationsDict = {
	main: "/",
	about: "/aboutprogram",
	solutions: "/solutions",
	infocentre: "/info",
	version: "/version",
};

export const LOGO_DATA = {
	url: "/icons/kpi_logo.svg",
	to: "https://kpi-monitor.ru",
};

export const SCROLL_LIMIT = 500;

export const keys = [
	"menu_main",
	"menu_about",
	"menu_solutions",
	"main_info",
	"russian_registry",
	"heading_main",
	"heading_clients",
	"heading_solutions",
	"heading_key_features",
	"heading_request",
	"heading_news",
	"heading_footer_contacts",
	"footer_adress",
	"footer_phones",
	"footer_email",
];

const captions = {
	menu_main: "Главная",
	menu_about: "О программе",
	menu_solutions: "Решения",
	main_info: "Инфоцентр",
	russian_registry: "Входим в реестр отечественного программного обеспечения.",
	heading_main: "Готовое решение для оценки эффективности работы компании",
	heading_clients: "Более 50 компаний сотрудничают с нами",
	heading_solutions: "Создаем решения для разных индустрий",
	heading_key_features: "Ключевые возможности KPI MONITOR",
	heading_request: "Оставьте заявку, и мы сразу начнем работу",
	heading_news: "Новости и мероприятия",
	heading_footer_contacts: "Контакты",
	footer_adress:
		"111250, г. Москва, проезд Завода «Серп и Молот», д. 6 корп. 1, Бизнес-центр «РОСТЭК»",
	footer_phones: "+7 (495) 662-11-31\n+7 (495) 662-11-32\n+7 (495) 662-11-33",
	footer_email: "info@kpi-monitor.ru",
};

const btnCaptions = {
	quick_start: "Быстрый старт",
	entry: "Войти",
	contact_us: "Связаться с нами",
	demo: "Посмотреть демо",
	learn_more: "Подробнее",
	all_news: "Все новости",
	solutions_education: "ТУРБО Университет",
};

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

const fakeLocales = [
	{
		id: 8,
		documentId: "ag2m5t1794r9oiw2ukjymg6w",
		name: "English (en)",
		code: "en",
		createdAt: "2025-04-17T12:35:59.352Z",
		updatedAt: "2025-04-17T12:35:59.352Z",
		publishedAt: "2025-04-17T12:35:59.360Z",
		isDefault: false,
	},
	{
		id: 9,
		documentId: "evcm0brctjdgmh9bkdwy6ah3",
		name: "Russian (ru)",
		code: "ru",
		createdAt: "2025-04-24T07:51:23.395Z",
		updatedAt: "2025-04-24T07:51:23.395Z",
		publishedAt: "2025-04-24T07:51:23.395Z",
		isDefault: true,
	},
	{
		id: 10,
		documentId: "qgmj0q96i6rgig7qdrn0d8dy",
		name: "Persian (Iran) (fa-IR)",
		code: "fa-IR",
		createdAt: "2025-04-24T07:52:07.557Z",
		updatedAt: "2025-04-24T07:52:07.557Z",
		publishedAt: "2025-04-24T07:52:07.558Z",
		isDefault: false,
	},
];

const navigationItems = [
	"Операторы",
	"Математические функции",
	"Строковые значения",
	"Работа с датами",
	"Дополнительные функции Мастера настройки импорта",
	"Вычисление значений показателей",
	"Дополнительные функции Карт KPI",
	"Параметры",
];
