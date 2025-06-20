import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useLanguage } from "./context/languageContext";
import { Locale } from "@api/interfaces";
import { useNavigation, useCaptions, useButtons, useLocales } from "@api/model";
import Home from "./pages/Home";
import InfoPage from "./pages/Info";
import EmptyPage from "./pages/Empty";
import NewsPage from "./pages/News";

import Header from "./widgets/header";
import Footer from "./widgets/footer";
import Loader from "@components/Loader";
import { LOGO_DATA } from "@consts/consts";
import { ScrollToTop } from "@components/ScrollToTop";

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
		return (
			<div className="wrapper">
				<Loader />
			</div>
		);
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

	const links = navData
		.filter(item => !item.parent)
		.sort((a, b) => a.order - b.order);

	return (
		<div className="wrapper">
			<Header
				logo={LOGO_DATA}
				links={links}
				navData={navData}
				btnCaptions={btnCaptions}
				locales={localesData}
				language={language}
				setLanguage={setLanguage}
			/>
			<main>
				<ScrollToTop />
				<Routes>
					<Route
						path="/"
						element={<Home captions={captions} btnCaptions={btnCaptions} />}
					/>
					<Route path="/main" element={<Navigate to="/" replace />} />
					<Route path="/infocentre">
						<Route index element={<Navigate to="functionhandbook" replace />} />
						<Route path="functionhandbook" element={<InfoPage />} />
						<Route
							path="news"
							element={
								<NewsPage captions={captions} btnCaptions={btnCaptions} />
							}
						/>
					</Route>

					<Route path="/empty" element={<EmptyPage />} />
					<Route path="*" element={<Navigate to="/empty" replace />} />
					{/* <Route path="/functionhandbook" element={<InfoPage />} /> */}
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
