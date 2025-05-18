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

	const buttonsQuery = useQuery({
		queryKey: ["buttons"],
		queryFn: () => fetch(urls.buttons).then(res => res.json()),
	});

	const clientsQuery = useQuery({
		queryKey: ["clients"],
		queryFn: () => fetch(urls.clients).then(res => res.json()),
	});

	const featuresQuery = useQuery({
		queryKey: ["features"],
		queryFn: () => fetch(urls.features).then(res => res.json()),
	});

	const newsQuery = useQuery({
		queryKey: ["news"],
		queryFn: () => fetch(urls.news).then(res => res.json()),
	});

	const solutionsQuery = useQuery({
		queryKey: ["solutions"],
		queryFn: () => fetch(urls.solutions).then(res => res.json()),
	});

	const functionTypesQuery = useQuery({
		queryKey: ["functionTypes"],
		queryFn: () => fetch(urls.functionTypes).then(res => res.json()),
	});

	const links =
		captionsQuery && captionsQuery.data
			? captionsQuery.data.data.filter((item: any) =>
					item.key.includes("menu_")
			  )
			: [];

	// console.log("menuData", captionsQuery.data);

	// console.log("clientsQuery", clientsQuery.data);
	console.log("captionsQuery", captionsQuery.data);
	console.log("buttonsQuery", buttonsQuery.data);
	console.log("clientsQuery", clientsQuery.data);
	console.log("featuresQuery", featuresQuery.data);
	console.log("newsQuery", newsQuery.data);
	console.log("solutionsQuery", solutionsQuery.data);
	console.log("functionTypesQuery", functionTypesQuery.data);

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
			{/* <Footer /> */}
		</div>
	);
};

export default App;
