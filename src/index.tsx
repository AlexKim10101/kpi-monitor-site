import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "normalize.css";
import "./assets/css/variables.css";
import "./assets/css/global.css";

import App from "./App";
import { LanguageProvider } from "./context/languageContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
	<BrowserRouter>
		<LanguageProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</LanguageProvider>
	</BrowserRouter>
);
