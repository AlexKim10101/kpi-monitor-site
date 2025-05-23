import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import classNames from "classnames";
import { Box, Typography } from "@mui/material";
import Button from "../../components/CustomButton";
import Icon from "../../components/icon";
import { getPathname } from "../../utils/getPathName";
import { locationsDict, LOGO_DATA, SCROLL_LIMIT } from "../../consts/consts";
import { useLanguage } from "../../context/languageContext";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import KpiMonitorIconMob from "@assets/icons/kpi_logo_mob.svg";
import BurgerIcon from "@assets/icons/burger-btn.svg";

import "./header.css";
import LanguageMenu from "@components/LanguageMenu";

type ILinkData = {
	key: string;
	caption: string;
};

type IHeader = {
	logo: { url: string; to: string };
	links: Record<string, any>[];
	btnCaptions: Record<string, string>;
};

const Header: React.FC<IHeader> = ({ logo, links, btnCaptions }) => {
	// console.log(links);
	const [hidden, setHidden] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();
	const { language, setLanguage } = useLanguage();

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
			<header className={hidden ? "hidden" : ""}>
				<div className="header-container">
					<div className="block-desk">
						<Link to={logo.to}>
							<KpiMonitorIcon />
							{/* <Box
								component="img"
								src={logo.url}
								alt="Kpi logo"
								sx={{
									width: "235px",
									height: "44px",
								}}
							/> */}
						</Link>
						<nav>
							<ul className="nav-list">
								{(links as ILinkData[]).map((link, index) => {
									const linkClassName = classNames("nav-link", {
										"nav-link-active":
											getPathname(locationsDict, link.key) === pathname,
									});
									return (
										<li key={index} className="nav-item">
											<Link
												to={getPathname(locationsDict, link.key)}
												className={linkClassName}
											>
												{link.caption}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>

						<div className="btn-wrapper">
							<Button variant="secondary">{btnCaptions.quick_start}</Button>
							<Button variant="primary">{btnCaptions.entry}</Button>

							<LanguageMenu />
						</div>
					</div>
					<div className="block-mob">
						<Link to={logo.to}>
							{/* <Box
								component="img"
								src={logo.url}
								alt="Kpi logo"
								sx={{
									width: "142px",
									height: "30px",
								}}
							/> */}
							<KpiMonitorIconMob />
						</Link>
						<div onClick={() => setIsOpen(!isOpen)}>
							{/* <Icon id="burgerBtn" path="/icons/burger-btn.svg" /> */}
							<BurgerIcon />
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
