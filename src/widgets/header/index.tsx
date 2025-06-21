import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import classNames from "classnames";
import Button from "@components/CustomButton";
import LanguageMenu from "@components/LanguageMenu";
import { Locale, Navigation } from "../../api/interfaces";
import MobileLanguageMenu from "@components/LanguageMenu/MobLanguagMenu";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import KpiMonitorIconMob from "@assets/icons/kpi_logo_mob.svg";
import MobMenuListItemIcon from "@assets/icons/mob-menu-list-item-icon.svg";
import BurgerIcon from "@assets/icons/burger-btn.svg";
import { getPathname } from "../../utils/getPathName";
import { locationsDict, SCROLL_LIMIT } from "../../consts/consts";

import "./header.css";
import { getNavigationTree } from "../../utils/getNavigationTree";
import MobAccordionComponent from "@components/AccordionComponent/MobAccordion";

type ILinkData = {
	key: string;
	caption: string;
};

type IHeaderProps = {
	logo: { url: string; to: string };
	links: Record<string, any>[];
	navData: Navigation[];
	btnCaptions: Record<string, string>;
	locales: Locale[];
	language: string;
	setLanguage: (code: string) => void;
};

const Header: React.FC<IHeaderProps> = ({
	logo,
	links,
	navData,
	btnCaptions,
	locales,
	language,
	setLanguage,
}) => {
	const [hidden, setHidden] = useState(false);
	const [openParent, setOpenParent] = useState<Navigation | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const { pathname, hash, key, search, state } = useLocation();
	const navTree = useMemo(() => getNavigationTree(navData), [navData]);

	// console.log("pathname", pathname);
	// console.log("hash", hash);
	// console.log("key", key);
	// console.log("search", search);
	// console.log("state", state);

	const handleClick = (node: Navigation | null) => {
		setOpenParent(prev => (prev === node ? null : node));
	};

	const handleClickAway = () => {
		setOpenParent(null);
	};

	const closeDropList = () => {
		setOpenParent(null);
	};

	const closeModal = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 300);
	};

	const listItemStyle = {
		"&.MuiListItem-root": {
			whiteSpace: "nowrap",
			width: "auto",
			cursor: "pointer",
			userSelect: "none",
			color: "var(--primary-color)",
			fontFamily: "Manrope",
			fontSize: "16px",
			fontStyle: "normal",
			fontWeight: 400,
			lineHeight: "normal",
			textDecoration: "none",
		},
	};

	useEffect(() => {
		const handleScroll = () => {
			const distanceFromBottom =
				document.documentElement.scrollHeight -
				window.scrollY -
				window.innerHeight;

			const newValue =
				distanceFromBottom < SCROLL_LIMIT && window.scrollY > SCROLL_LIMIT / 2;

			setHidden(newValue);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<header
				className={classNames(
					"mob-padding",
					hidden && "hidden",
					Boolean(openParent) && "bottomBorder"
				)}
			>
				<div className="header-container">
					<div className="block-desk">
						<ClickAwayListener onClickAway={handleClickAway}>
							<div className="header-grid">
								<Link to={logo.to} className="grid-item-logo">
									<KpiMonitorIcon />
								</Link>

								<div className="empty1"></div>

								<div className="grid-item-nav">
									<List
										component="nav"
										sx={{
											"&.MuiList-root": {
												display: "flex",
												position: "static",
											},
											"& .MuiButtonBase-root": {
												flexGrow: 0,
											},
										}}
									>
										{navTree.map(parent => {
											const hasChildren = parent.children.length > 0;
											const linkClassName = classNames("nav-link", {
												"nav-link-active":
													pathname.split("/").includes(parent.key) ||
													(pathname === "/" && parent.key === "main"),
											});

											return (
												<React.Fragment key={parent.id}>
													{hasChildren ? (
														<ListItem
															onClick={() => handleClick(parent)}
															sx={listItemStyle}
														>
															<div className={linkClassName}>
																{parent.caption}
																{openParent && openParent.id === parent.id ? (
																	<ExpandLess />
																) : (
																	<ExpandMore />
																)}
															</div>
														</ListItem>
													) : (
														<ListItem
															component={Link}
															// to={getPathname(locationsDict, parent.key)}
															to={`/${parent.key}`}
															onClick={closeDropList}
															sx={listItemStyle}
														>
															<div className={linkClassName}>
																{parent.caption}
															</div>
														</ListItem>
													)}
												</React.Fragment>
											);
										})}
									</List>
								</div>

								<div className="empty2"></div>

								<div className="btn-wrapper grid-item-btns">
									<Button variant="secondary">{btnCaptions.quick_start}</Button>
									<Button variant="primary">{btnCaptions.entry}</Button>

									<LanguageMenu
										locales={locales}
										setLanguage={setLanguage}
										language={language}
									/>
								</div>
								{openParent && (
									<Collapse
										in={Boolean(openParent) && !hidden}
										timeout={{ appear: 0, enter: 0, exit: 0 }}
										unmountOnExit
										sx={{
											"&.MuiCollapse-root": {
												width: "100%",
												backgroundColor: "var(--white-color)",
												boxSizing: "border-box",
												padding: "10px 10px 20px 10px",
												borderRadius: " 0px 0px 20px 20px",
												borderRight: "1px solid var(--secondary-color)",
												borderBottom: "1px solid var(--secondary-color)",
												borderLeft: "1px solid var(--secondary-color)",
												gridArea: "col",
											},
										}}
									>
										<List
											component="div"
											disablePadding
											sx={{
												"&.MuiList-root": {
													display: "flex",
													gap: "10px",
													flexWrap: "wrap",
												},
											}}
										>
											{openParent.children.map((child: Navigation) => {
												const linkClassName = classNames("nav-link", {
													"nav-link-active": pathname
														.split("/")
														.includes(child.key),
												});

												return (
													<ListItem
														key={child.id}
														sx={listItemStyle}
														component={Link}
														to={`/${(openParent as Navigation).key}/${
															child.key
														}`}
														onClick={closeDropList}
													>
														<div className={linkClassName}>{child.caption}</div>
													</ListItem>
												);
											})}
										</List>
									</Collapse>
								)}
							</div>
						</ClickAwayListener>
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
								{navTree.map(parent => {
									const hasChildren = parent.children.length > 0;

									if (hasChildren) {
										return (
											<MobAccordionComponent
												summary={
													<li key={parent.id} className="mob-nav-item">
														{parent.caption}
													</li>
												}
												details={parent.children.map(child => (
													<div key={child.id}>
														<Link
															to={`/${parent.key}/${child.key}`}
															onClick={closeModal}
														>
															{child.caption}
														</Link>
													</div>
												))}
											/>
										);
									}

									return (
										<li key={parent.id} className="mob-nav-item">
											<Link to={`/${parent.key}`} onClick={closeModal}>
												{parent.caption}
											</Link>
										</li>
									);
								})}

								{/* {links.map((link, index) => {
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
								})} */}
							</ul>
						</nav>
						{/* <MobileLanguageMenu
							locales={locales}
							setLanguage={setLanguage}
							language={language}
							closeMenu={closeModal}
						/> */}
						<MobAccordionComponent
							summary={
								<>
									<span
										style={{ textTransform: "uppercase" }}
										className="mob-accent-text"
									>
										{language}
									</span>
									&nbsp;
									<span className="mob-text">Choose your language</span>
								</>
							}
							details={locales.map(l => (
								<div
									key={l.id}
									className="mob-text"
									onClick={() => {
										setLanguage(l.code);
										closeModal();
									}}
								>
									{l.name}
								</div>
							))}
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
