import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledLink = styled(Link)`
	margin: 0 10px;
	color: blue;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const App = () => (
	<div>
		<nav>
			<StyledLink to="/">Home</StyledLink>
			<StyledLink to="/about">About</StyledLink>
		</nav>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
		</Routes>
	</div>
);

export default App;
