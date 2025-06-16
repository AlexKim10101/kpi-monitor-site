import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import classNames from "classnames";
import Button from "@components/CustomButton";
import LanguageMenu from "@components/LanguageMenu";
import { Locale } from "../../api/interfaces";
import MobileLanguageMenu from "@components/LanguageMenu/MobLanguagMenu";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import KpiMonitorIconMob from "@assets/icons/kpi_logo_mob.svg";
import MobMenuListItemIcon from "@assets/icons/mob-menu-list-item-icon.svg";
import BurgerIcon from "@assets/icons/burger-btn.svg";
import { getPathname } from "../../utils/getPathName";
import { locationsDict, SCROLL_LIMIT } from "../../consts/consts";

import "./header.css";

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
	const [isClosing, setIsClosing] = useState(false);

	const closeModal = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 300);
	};

	const { pathname } = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			const distanceFromBottom =
				document.documentElement.scrollHeight -
				window.scrollY -
				window.innerHeight;
			setHidden(
				distanceFromBottom < SCROLL_LIMIT && window.scrollY > SCROLL_LIMIT / 2
			);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<header className={classNames("mob-padding", hidden && "hidden")}>
				<div className="header-container">
					<div className="block-desk">
						<Link to={logo.to}>
							<KpiMonitorIcon />
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
												className={linkClassName}
												to={getPathname(locationsDict, link.key)}
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
							<KpiMonitorIconMob />
						</Link>
						<div
							onClick={() => {
								isOpen && closeModal();
								!isOpen && setIsOpen(true);
							}}
						>
							<BurgerIcon />
						</div>
					</div>
				</div>
			</header>
			{isOpen && (
				<>
					<div
						className={classNames("overlay", isClosing && "overlay-hidden")}
						onClick={closeModal}
					/>

					<div
						className={classNames(
							"mob-nav",
							isClosing && "mob-nav-hide",
							!isClosing && "mob-nav-show"
						)}
					>
						<nav>
							<ul className="mob-nav-list">
								{links.map((link, index) => {
									const linkClassName = classNames("mob-nav-link", {
										"mob-nav-link--active":
											getPathname(locationsDict, link.key) === pathname,
									});

									return (
										<li key={index} className="mob-nav-item">
											<Link
												to={getPathname(locationsDict, link.key)}
												className={linkClassName}
												onClick={closeModal}
											>
												{link.caption}
											</Link>
											<MobMenuListItemIcon />
										</li>
									);
								})}
							</ul>
						</nav>
						<MobileLanguageMenu
							locales={locales}
							setLanguage={setLanguage}
							language={language}
							closeMenu={closeModal}
						/>
						<div className="mobHeaderBtnWrapper">
							<Button variant="secondary">{btnCaptions.quick_start}</Button>
							<Button variant="primary">{btnCaptions.entry}</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Header;
