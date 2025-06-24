import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Box, Modal } from "@mui/material";

import { useLanguage } from "./context/languageContext";
import { useNavigation, useCaptions, useButtons, useLocales } from "@api/model";
import Home from "./pages/Home";
import InfoPage from "./pages/Info";
import EmptyPage from "./pages/Empty";
import NewsPage from "./pages/News";
import Auth from "./pages/Auth";
import Contacts from "./pages/Contacts";
import ArticlePage from "./pages/Article";

import Header from "./widgets/header";
import Footer from "./widgets/footer";
import Loader from "@components/Loader";
import { ScrollToTop } from "@components/ScrollToTop";
import { getNavigationTree } from "./utils/getNavigationTree";
import RegistrationForm from "@components/Forms/registrationForm";
import AutorisationForm from "@components/Forms/autorisationForm";
import Button from "@components/CustomButton";
import LanguageMenu from "@components/LanguageMenu";
import { LOGO_DATA } from "@consts/consts";

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
							path="contacts"
							element={
								<Contacts captions={captions} btnCaptions={btnCaptions} />
							}
						/>
					</Route>

					<Route path="/infocentre/news">
						<Route
							index
							element={
								<NewsPage captions={captions} btnCaptions={btnCaptions} />
							}
						/>
						<Route
							path="article/:id"
							element={
								<ArticlePage captions={captions} btnCaptions={btnCaptions} />
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
				<Button variant="primary" onClick={handleOpen}>
					{btnCaptions.entry}
				</Button>
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
