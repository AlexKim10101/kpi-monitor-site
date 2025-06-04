import React, { useEffect } from "react";
import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import {
	useNavigation,
	useCaptions,
	useButtons,
	useLocales,
} from "./api/model";
import { LOGO_DATA, urls } from "./consts/consts";
import InfoPage from "./pages/Info";
import { Locale } from "./api/interfaces";
import { useLanguage } from "./context/languageContext";

const App = () => {
	const {
		data: localesData,
		isLoading: isLocalesLoaging,
		error: localesError,
	} = useLocales();

	const { language, setLanguage } = useLanguage();

	const currentLocale = localesData.find(l => l.isDefault) as Locale;

	useEffect(() => {
		if (currentLocale && currentLocale.code !== language) {
			setLanguage(currentLocale.code);
		}
	}, [currentLocale]);

	const { data, isLoading, error } = useCaptions();

	const {
		data: navData,
		isLoading: isNavLoaging,
		error: navError,
	} = useNavigation();

	const {
		data: btnData,
		isLoading: isBtnLoaging,
		error: btnError,
	} = useButtons();

	if (isLoading || isBtnLoaging || isNavLoaging || isLocalesLoaging) {
		return <div>Загрузка...</div>;
	}

	if (
		error ||
		btnError ||
		navError ||
		localesError ||
		!data ||
		!btnData ||
		!navData ||
		!localesData
	)
		return <p>Ошибка загрузки данных</p>;

	const captions: Record<string, string> = data.reduce((acc, item) => {
		return { ...acc, [item.key]: item.caption };
	}, {});

	const btnCaptions: Record<string, string> = btnData.reduce((acc, item) => {
		return { ...acc, [item.key]: item.caption };
	}, {});

	const links = navData.filter(item => !item.parent);

	return (
		<div className="wrapper">
			<Header
				logo={LOGO_DATA}
				links={links}
				btnCaptions={btnCaptions}
				locales={localesData}
				language={language}
				setLanguage={setLanguage}
			/>
			<main>
				<Routes>
					<Route
						path="/"
						element={<Home captions={captions} btnCaptions={btnCaptions} />}
					/>
					<Route path="/aboutprogram" element={<InfoPage />} />
					<Route path="/solutions" element={<InfoPage />} />
					<Route path="/info" element={<InfoPage />} />
					<Route path="/version" element={<InfoPage />} />
				</Routes>
			</main>

			<Footer
				logo={LOGO_DATA}
				links={links}
				btnCaptions={btnCaptions}
				captions={captions}
			/>
		</div>
	);
};

export default App;

// const stagesQuery = useQuery({
// 	queryKey: ["stages"],
// 	queryFn: () => fetch(urls.stages).then(res => res.json()),
// });

// const captionsQuery = useQuery({
// 	queryKey: ["captions"],
// 	queryFn: () => fetch(urls.captions).then(res => res.json()),
// });

// const buttonsQuery = useQuery({
// 	queryKey: ["buttons"],
// 	queryFn: () => fetch(urls.buttons).then(res => res.json()),
// });

// const clientsQuery = useQuery({
// 	queryKey: ["clients"],
// 	queryFn: () => fetch(urls.clients).then(res => res.json()),
// });

// const featuresQuery = useQuery({
// 	queryKey: ["features"],
// 	queryFn: () => fetch(urls.features).then(res => res.json()),
// });

// const newsQuery = useQuery({
// 	queryKey: ["news"],
// 	queryFn: () => fetch(urls.news).then(res => res.json()),
// });

// const functionTypesQuery = useQuery({
// 	queryKey: ["functionTypes"],
// 	queryFn: () => fetch(urls.functionTypes).then(res => res.json()),
// });

// const functionBlocksQuery = useQuery({
// 	queryKey: ["functionBlocks"],
// 	queryFn: () => fetch(urls.functionBlocks).then(res => res.json()),
// });

// console.log("functionTypesQuery", functionTypesQuery.data);

// console.log("functionBlocksQuery", functionBlocksQuery.data);
// console.log("buttonsQuery", buttonsQuery.data);
// console.log("featuresQuery", featuresQuery.data);
// console.log("newsQuery", newsQuery.data);
