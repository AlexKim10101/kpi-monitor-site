import React from "react";
import { Routes, Route, HashRouter } from "react-router";

import { useQuery } from "@tanstack/react-query";
import Home from "./pages/Home";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import { useCaptions } from "./api/model";
import { LOGO_DATA, urls } from "./consts/consts";
import InfoPage from "./pages/Info";

const App = () => {
	const { data, isLoading, error } = useCaptions();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	const captions: Record<string, string> = data.reduce((acc, item) => {
		return { ...acc, [item.key]: item.caption };
	}, {});

	const links = data.filter(
		(item: any) => item.key.includes("menu_") || item.key.includes("main_")
	);

	return (
		<div className="wrapper">
			<Header logo={LOGO_DATA} links={links} />
			<main>
				<Routes>
					<Route path="/" element={<Home captions={captions} />} />
					<Route path="/info" element={<InfoPage />} />
				</Routes>
			</main>

			<Footer logo={LOGO_DATA} links={links} />
		</div>
	);
};

export default App;

// const captionsQuery = useQuery({
// 	queryKey: ["captions"],
// 	queryFn: () => fetch(urls.captions).then(res => res.json()),
// });

// const buttonsQuery = useQuery({
// 	queryKey: ["buttons"],
// 	queryFn: () => fetch(urls.buttons).then(res => res.json()),
// });

// // const clientsQuery = useQuery({
// // 	queryKey: ["clients"],
// // 	queryFn: () => fetch(urls.clients).then(res => res.json()),
// // });

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
// console.log("functionBlocksQuery", functionBlocksQuery.data);
// console.log("buttonsQuery", buttonsQuery.data);
// console.log("featuresQuery", featuresQuery.data);
// console.log("newsQuery", newsQuery.data);
