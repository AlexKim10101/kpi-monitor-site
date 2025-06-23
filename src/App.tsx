import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { useLanguage } from "./context/languageContext";
import { useNavigation, useCaptions, useButtons, useLocales } from "@api/model";
import Home from "./pages/Home";
import InfoPage from "./pages/Info";
import EmptyPage from "./pages/Empty";
import NewsPage from "./pages/News";
import Auth from "./pages/Auth";
import Contacts from "./pages/Contacts";

import Header from "./widgets/header";
import Footer from "./widgets/footer";
import Loader from "@components/Loader";
import { LOGO_DATA } from "@consts/consts";
import { ScrollToTop } from "@components/ScrollToTop";
import { getNavigationTree } from "./utils/getNavigationTree";
import RegistrationForm from "@components/Forms/registrationForm";
import AutorisationForm from "@components/Forms/autorisationForm";
import Button from "@components/CustomButton";
import LanguageMenu from "@components/LanguageMenu";
import { Box, Modal } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	boxShadow: 24,
	borderRadius: "20px",
};

const App = () => {
	const { language, setLanguage } = useLanguage();

	const {
		data: localesData,
		isLoading: isLocalesLoading,
		error: localesError,
	} = useLocales();

	const {
		data: captionsData,
		isLoading: isCaptionsLoading,
		error: captionsError,
	} = useCaptions();

	const {
		data: navData,
		isLoading: isNavLoading,
		error: navError,
	} = useNavigation();

	const {
		data: btnData,
		isLoading: isBtnLoading,
		error: btnError,
	} = useButtons();

	const { pathname } = useLocation();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const isAnyLoading =
		isLocalesLoading || isCaptionsLoading || isNavLoading || isBtnLoading;
	const isAnyError = localesError || captionsError || navError || btnError;

	useEffect(() => {
		const defaultLocale = localesData?.find(locale => locale.isDefault);
		if (defaultLocale && defaultLocale.code !== language) {
			setLanguage(defaultLocale.code);
		}
	}, []);

	const navTree = useMemo(
		() => (navData ? getNavigationTree(navData) : []),
		[navData]
	);

	const captions = useMemo(() => {
		return (captionsData || []).reduce<Record<string, string>>((acc, item) => {
			acc[item.key] = item.caption;
			return acc;
		}, {});
	}, [captionsData]);

	const btnCaptions = useMemo(() => {
		return (btnData || []).reduce<Record<string, string>>((acc, item) => {
			acc[item.key] = item.caption;
			return acc;
		}, {});
	}, [btnData]);

	if (isAnyLoading) {
		return (
			<div className="wrapper">
				<Loader />
			</div>
		);
	}

	if (isAnyError || !captionsData || !btnData || !navData || !localesData) {
		return <p>Ошибка загрузки данных</p>;
	}

	return (
		<div className="wrapper">
			<Header
				pathname={pathname}
				logo={LOGO_DATA}
				navData={navTree}
				btnCaptions={btnCaptions}
				locales={localesData}
				language={language}
				setLanguage={setLanguage}
			>
				<Button variant="secondary" href="/auth">
					{btnCaptions.quick_start}
				</Button>
				<Button variant="primary" onClick={handleOpen}>
					{btnCaptions.entry}
				</Button>

				<LanguageMenu
					locales={localesData}
					setLanguage={setLanguage}
					language={language}
				/>
			</Header>

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
						<Route
							path="contacts"
							element={
								<Contacts captions={captions} btnCaptions={btnCaptions} />
							}
						/>
					</Route>

					<Route path="/auth" element={<Auth />}>
						<Route index element={<Navigate to="registration" replace />} />
						<Route path="registration" element={<RegistrationForm />} />
						<Route path="autorisation" element={<AutorisationForm />} />
					</Route>
					<Route path="/empty" element={<EmptyPage />} />
					<Route path="*" element={<Navigate to="/empty" replace />} />
				</Routes>
			</main>

			<Footer
				logo={LOGO_DATA}
				navData={navTree}
				pathname={pathname}
				btnCaptions={btnCaptions}
				captions={captions}
			>
				<Button variant="secondary" href="/auth">
					{btnCaptions.quick_start}
				</Button>
				<Button variant="primary">{btnCaptions.entry}</Button>
			</Footer>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<AutorisationForm onClose={handleClose} />
				</Box>
			</Modal>
		</div>
	);
};

export default App;

// const App = () => {
// 	const {
// 		data: localesData,
// 		isLoading: isLocalesLoaging,
// 		error: localesError,
// 	} = useLocales();

// 	const { language, setLanguage } = useLanguage();

// 	const currentLocale = localesData.find(l => l.isDefault) as Locale;

// 	useEffect(() => {
// 		if (currentLocale && currentLocale.code !== language) {
// 			setLanguage(currentLocale.code);
// 		}
// 	}, [currentLocale]);

// 	const { data, isLoading, error } = useCaptions();

// 	const {
// 		data: navData,
// 		isLoading: isNavLoaging,
// 		error: navError,
// 	} = useNavigation();

// 	const {
// 		data: btnData,
// 		isLoading: isBtnLoaging,
// 		error: btnError,
// 	} = useButtons();

// 	if (isLoading || isBtnLoaging || isNavLoaging || isLocalesLoaging) {
// 		return (
// 			<div className="wrapper">
// 				<Loader />
// 			</div>
// 		);
// 	}

// 	if (
// 		error ||
// 		btnError ||
// 		navError ||
// 		localesError ||
// 		!data ||
// 		!btnData ||
// 		!navData ||
// 		!localesData
// 	)
// 		return <p>Ошибка загрузки данных</p>;
// 	const navTree = useMemo(() => getNavigationTree(navData), [navData]);

// 	const { pathname } = useLocation();

// 	const captions: Record<string, string> = data.reduce((acc, item) => {
// 		return { ...acc, [item.key]: item.caption };
// 	}, {});

// 	const btnCaptions: Record<string, string> = btnData.reduce((acc, item) => {
// 		return { ...acc, [item.key]: item.caption };
// 	}, {});

// 	return (
// 		<div className="wrapper">
// 			<Header
// 				pathname={pathname}
// 				logo={LOGO_DATA}
// 				navData={navTree}
// 				btnCaptions={btnCaptions}
// 				locales={localesData}
// 				language={language}
// 				setLanguage={setLanguage}
// 			/>
// 			<main>
// 				<ScrollToTop />
// 				<Routes>
// 					<Route
// 						path="/"
// 						element={<Home captions={captions} btnCaptions={btnCaptions} />}
// 					/>
// 					<Route path="/main" element={<Navigate to="/" replace />} />
// 					<Route path="/infocentre">
// 						<Route index element={<Navigate to="functionhandbook" replace />} />
// 						<Route path="functionhandbook" element={<InfoPage />} />
// 						<Route
// 							path="news"
// 							element={
// 								<NewsPage captions={captions} btnCaptions={btnCaptions} />
// 							}
// 						/>
// 					</Route>

// 					<Route path="/empty" element={<EmptyPage />} />
// 					<Route path="*" element={<Navigate to="/empty" replace />} />
// 					{/* <Route path="/functionhandbook" element={<InfoPage />} /> */}
// 				</Routes>
// 			</main>

// 			<Footer
// 				logo={LOGO_DATA}
// 				navData={navTree}
// 				pathname={pathname}
// 				btnCaptions={btnCaptions}
// 				captions={captions}
// 			/>
// 		</div>
// 	);
// };

//  export default App;
