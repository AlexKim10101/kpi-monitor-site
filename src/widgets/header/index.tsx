import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import classNames from "classnames";
import Button from "../../components/CustomButton";
import { getPathname } from "../../utils/getPathName";
import { locationsDict, SCROLL_LIMIT } from "../../consts/consts";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import KpiMonitorIconMob from "@assets/icons/kpi_logo_mob.svg";
import BurgerIcon from "@assets/icons/burger-btn.svg";
import "./header.css";
import LanguageMenu from "@components/LanguageMenu";
import { Locale } from "../../api/interfaces";

type ILinkData = {
	key: string;
	caption: string;
};

type IHeaderProps = {
	logo: { url: string; to: string };
	links: Record<string, any>[];
	btnCaptions: Record<string, string>;
	locales: Locale[];
	language: string;
	setLanguage: (code: string) => void;
};

const Header: React.FC<IHeaderProps> = ({
	logo,
	links,
	btnCaptions,
	locales,
	language,
	setLanguage,
}) => {
	const [hidden, setHidden] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const scrollLimit = SCROLL_LIMIT;
	// 		setHidden(window.scrollY > scrollLimit);
	// 	};
	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);

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

							<LanguageMenu
								locales={locales}
								setLanguage={setLanguage}
								language={language}
							/>
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
