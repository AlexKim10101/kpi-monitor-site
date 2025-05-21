import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";

import { useQuery } from "@tanstack/react-query";
import Home from "./pages/Home";
import About from "./pages/About";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import { LOGO_DATA, urls } from "./consts/consts";

// const StyledLink = styled(Link)`
// 	margin: 0 10px;
// 	color: blue;
// 	text-decoration: none;

// 	&:hover {
// 		text-decoration: underline;
// 	}
// `;

const App = () => {
	const captionsQuery = useQuery({
		queryKey: ["captions"],
		queryFn: () => fetch(urls.captions).then(res => res.json()),
	});

	const links =
		captionsQuery && captionsQuery.data
			? captionsQuery.data.data.filter((item: any) =>
					item.key.includes("menu_")
			  )
			: [];

	return (
		<div>
			{/* <nav>
				<StyledLink to="/">Home</StyledLink>
				<StyledLink to="/about">About</StyledLink>
			</nav> */}

			<Header logo={LOGO_DATA} links={links} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer logo={LOGO_DATA} links={links} />
		</div>
	);
};

export default App;

// <Box
// 	component="footer"
// 	sx={{
// 		pt: 5,
// 		pb: 10,
// 		px: { xs: 3, md: 15 },
// 		display: "flex",
// 		flexDirection: "column",
// 		alignItems: "flex-start",
// 		gap: 10,
// 	}}
// >
// 	<Stack
// 		direction={{ xs: "column", md: "row" }}
// 		spacing={{ xs: 5, md: 0 }}
// 		justifyContent="space-between"
// 		width="100%"
// 	>
// 		{/* <KpiLogo sx={{ width: "235px", height: "44px" }} /> */}

// 		<Stack
// 			direction={{ xs: "column", md: "row" }}
// 			spacing={{ xs: 5, md: 26 }}
// 			width="100%"
// 		>
// 			<Box sx={{ width: { xs: "100%", md: "190px" } }}>
// 				<Tabs
// 					value={value}
// 					// onChange={()=>handleChange()}
// 					sx={{
// 						mb: 7.5,
// 						"& .MuiTabs-flexContainer": {
// 							flexWrap: "wrap",
// 						},
// 					}}
// 					TabIndicatorProps={{
// 						style: { display: "none" },
// 					}}
// 				>
// 					{navItems.map((item, index) => (
// 						<StyledTab key={index} label={item} />
// 					))}
// 				</Tabs>

// 				<Stack spacing={2.5}>
// 					<Button
// 						variant="contained"
// 						sx={{
// 							bgcolor: "var(--bluesec)",
// 							color: "var(--accent)",
// 							borderRadius: "30px",
// 							textTransform: "none",
// 							px: 3.75,
// 							py: 1.25,
// 							fontFamily: "Ubuntu, Helvetica",
// 							fontSize: "16px",
// 							"&:hover": {
// 								bgcolor: "var(--bluesec)",
// 								opacity: 0.9,
// 							},
// 						}}
// 					>
// 						Быстрый старт
// 					</Button>

// 					<Button
// 						variant="contained"
// 						sx={{
// 							bgcolor: "var(--accent)",
// 							color: "white",
// 							borderRadius: "30px",
// 							textTransform: "none",
// 							px: 3.75,
// 							py: 1.25,
// 							fontFamily: "Ubuntu, Helvetica",
// 							fontSize: "16px",
// 							"&:hover": {
// 								bgcolor: "var(--bluehover)",
// 							},
// 						}}
// 					>
// 						Войти
// 					</Button>
// 				</Stack>
// 			</Box>

// 			<Box sx={{ flexGrow: 1 }}>
// 				<Typography
// 					variant="h4"
// 					sx={{
// 						mb: 1.875,
// 						fontFamily: "Manrope, Helvetica",
// 						fontSize: "32px",
// 						color: "var(--accent)",
// 					}}
// 				>
// 					Контакты:
// 				</Typography>

// 				<Stack spacing={3.25}>
// 					<Typography
// 						sx={{
// 							fontFamily: "Manrope, Helvetica",
// 							fontSize: "16px",
// 							color: "var(--accent)",
// 						}}
// 					>
// 						111250, г. Москва, проезд Завода «Серп и Молот», д. 6 корп. 1,
// 						Бизнес-центр «РОСТЭК»
// 					</Typography>

// 					<Stack
// 						direction={{ xs: "column", sm: "row" }}
// 						spacing={7.5}
// 						width="100%"
// 					>
// 						<Stack spacing={1.25}>
// 							{phoneNumbers.map((phone, index) => (
// 								<Typography
// 									key={index}
// 									sx={{
// 										fontFamily: "Manrope, Helvetica",
// 										fontSize: "16px",
// 										color: "var(--accent)",
// 									}}
// 								>
// 									{phone}
// 								</Typography>
// 							))}
// 						</Stack>

// 						<Typography
// 							sx={{
// 								fontFamily: "Manrope, Helvetica",
// 								fontSize: "16px",
// 								color: "var(--accent)",
// 							}}
// 						>
// 							info@kpi-monitor.ru
// 						</Typography>
// 					</Stack>

// 					<Box
// 						component="img"
// 						// src={logoMim}
// 						alt="Logo mim"
// 						sx={{ width: "62px", height: "77px" }}
// 					/>
// 				</Stack>
// 			</Box>
// 		</Stack>
// 	</Stack>

// 	<Typography
// 		sx={{
// 			fontFamily: "Manrope, Helvetica",
// 			fontSize: "14px",
// 			color: "var(--accent)",
// 			lineHeight: "normal",
// 		}}
// 	>
// 		© 2010 KPI MONITOR - Автоматизация ключевых показателей эффективности (KPI)
// 		предприятия. Все права защищены. Публикация любых материалов сайта возможна
// 		только с разрешения владельца.{" "}
// 		<Link
// 			href="https://kpi-monitor.ru/terms-of-use"
// 			target="_blank"
// 			rel="noopener noreferrer"
// 			sx={{ color: "var(--accent)" }}
// 		>
// 			Пользовательское соглашение
// 		</Link>{" "}
// 		|{" "}
// 		<Link
// 			href="https://kpi-monitor.ru/privacy-policy"
// 			target="_blank"
// 			rel="noopener noreferrer"
// 			sx={{ color: "var(--accent)" }}
// 		>
// 			Политика конфиденциальности
// 		</Link>{" "}
// 		.
// 	</Typography>
// </Box>;
