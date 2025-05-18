import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
	AppBar,
	Box,
	Container,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import "./header.css";
import { LOGO_DATA, SCROLL_LIMIT } from "../../consts/consts";
import Button from "../../components/CustomButton";
import Icon from "../../components/icon";

type IHeader = {
	logo: { url: string; to: string };
	links: Record<string, any>[];
};

const Header: React.FC<IHeader> = ({ logo, links }) => {
	console.log(links);
	const [hidden, setHidden] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollLimit = SCROLL_LIMIT;
			setHidden(window.scrollY > scrollLimit);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<header>
				<div className="header-container">
					<div className="block-desk">
						<Link to={logo.to}>
							<Box
								component="img"
								src={logo.url}
								alt="Kpi logo"
								sx={{
									width: "235px",
									height: "44px",
								}}
							/>
						</Link>
						<nav>
							<ul className="nav-list">
								{links.map((link, index) => (
									<li key={index} className="nav-item">
										<Link to={""} className="nav-link">
											{link.caption}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<div className="btn-wrapper">
							<Button variant="secondary">Быстрый старт</Button>
							<Button variant="accent">Войти</Button>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="center"
								padding={1.25}
								borderRadius="10px"
								border={1}
								borderColor="primary.main"
								sx={{ cursor: "pointer" }}
							>
								<Typography
									variant="button"
									color="primary.main"
									sx={{ lineHeight: 1 }}
								>
									RU
								</Typography>
							</Box>
						</div>
					</div>
					<div className="block-mob">
						<Link to={logo.to}>
							<Box
								component="img"
								src={logo.url}
								alt="Kpi logo"
								sx={{
									width: "142px",
									height: "30px",
								}}
							/>
						</Link>
						<div onClick={() => setIsOpen(!isOpen)}>
							<Icon id="burgerBtn" path="/icons/burger-btn.svg" />
						</div>
					</div>
				</div>
			</header>
			{isOpen && (
				<>
					<div className="overlay" onClick={() => setIsOpen(false)} />

					<div className="mob-nav">
						<nav>
							<ul className="mob-nav-list">
								{links.map((link, index) => (
									<li key={index} className="mob-nav-item">
										<Link to={""} className="mob-nav-link">
											{link.caption}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</>
			)}
		</>
	);
};

export default Header;

// <Container maxWidth={false}>
// 	<Toolbar disableGutters sx={{ height: "100%" }}>
// 		{/* Logo */}
// 		<Box
// 			component="img"
// 			src="./kpi-logo.svg"
// 			alt="Kpi logo"
// 			sx={{
// 				width: "235px",
// 				height: "44px",
// 				mr: "100px",
// 			}}
// 		/>

// 		{/* Navigation Menu */}
// 		<Stack direction="row" spacing={0.5} sx={{ flexGrow: 1 }}>
// 			{navItems.map(item => (
// 				<Box
// 					key={item.name}
// 					sx={{
// 						p: 2.5,
// 						borderBottom: item.active ? 1 : 0,
// 						borderColor: item.active ? "primary.main" : "transparent",
// 						cursor: "pointer",
// 					}}
// 				>
// 					<Typography
// 						sx={{
// 							color: "primary.main",
// 							fontFamily: "var(--body-caption-pc-reg-font-family)",
// 							fontSize: "var(--body-caption-pc-reg-font-size)",
// 							fontWeight: "var(--body-caption-pc-reg-font-weight)",
// 							letterSpacing: "var(--body-caption-pc-reg-letter-spacing)",
// 							lineHeight: "var(--body-caption-pc-reg-line-height)",
// 						}}
// 					>
// 						{item.name}
// 					</Typography>
// 				</Box>
// 			))}
// 		</Stack>

// 		{/* Action Buttons */}
// 		<Stack direction="row" spacing={2.5} alignItems="center">
// 			<Stack direction="row" spacing={2}>
// 				<Button
// 					variant="contained"
// 					sx={{
// 						backgroundColor: "var(--bluesec)",
// 						color: "primary.main",
// 						borderRadius: "30px",
// 						px: "30px",
// 						py: 1.25,
// 						textTransform: "none",
// 						fontFamily: "var(--button-pc-font-family)",
// 						fontSize: "var(--button-pc-font-size)",
// 						fontWeight: "var(--button-pc-font-weight)",
// 						letterSpacing: "var(--button-pc-letter-spacing)",
// 						lineHeight: "var(--button-pc-line-height)",
// 						"&:hover": {
// 							backgroundColor: "var(--bluesec)",
// 						},
// 					}}
// 				>
// 					Быстрый старт
// 				</Button>
// 				<Button
// 					variant="contained"
// 					sx={{
// 						backgroundColor: "primary.main",
// 						color: "white",
// 						borderRadius: "30px",
// 						px: "30px",
// 						py: 1.25,
// 						textTransform: "none",
// 						fontFamily: "var(--button-pc-font-family)",
// 						fontSize: "var(--button-pc-font-size)",
// 						fontWeight: "var(--button-pc-font-weight)",
// 						letterSpacing: "var(--button-pc-letter-spacing)",
// 						lineHeight: "var(--button-pc-line-height)",
// 					}}
// 				>
// 					Войти
// 				</Button>
// 			</Stack>

// 			{/* Language Selector */}
// 			<Box
// 				sx={{
// 					width: "42px",
// 					height: "42px",
// 					display: "flex",
// 					alignItems: "center",
// 					justifyContent: "center",
// 					border: 1,
// 					borderColor: "primary.main",
// 					borderRadius: "10px",
// 				}}
// 			>
// 				<Typography
// 					sx={{
// 						color: "primary.main",
// 						fontFamily: "var(--button-pc-font-family)",
// 						fontSize: "var(--button-pc-font-size)",
// 						fontWeight: "var(--button-pc-font-weight)",
// 						letterSpacing: "var(--button-pc-letter-spacing)",
// 						lineHeight: "var(--button-pc-line-height)",
// 					}}
// 				>
// 					RU
// 				</Typography>
// 			</Box>
// 		</Stack>
// 	</Toolbar>
// </Container>;
