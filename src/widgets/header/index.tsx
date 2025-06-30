import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { List, ListItem, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import classNames from "classnames";
import Button from "@components/CustomButton";
import LanguageMenu from "@components/LanguageMenu";
import { Locale, Navigation } from "../../api/interfaces";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import KpiMonitorIconMob from "@assets/icons/kpi_logo_mob.svg";
import BurgerIcon from "@assets/icons/burger-btn.svg";
import { SCROLL_LIMIT } from "../../consts/consts";
import { NavigationWithChildren } from "../../utils/getNavigationTree";
import MobAccordionComponent from "@components/AccordionComponent/MobAccordion";

import "./header.css";

type IHeaderProps = {
	pathname: string;
	logo: { url: string; to: string };
	navData: NavigationWithChildren[];
	btnCaptions: Record<string, string>;
	locales: Locale[];
	language: string;
	setLanguage: (code: string) => void;
	children?: React.ReactNode | React.ReactNode[];
};

const Header: React.FC<IHeaderProps> = ({
	pathname,
	logo,
	navData,
	btnCaptions,
	locales,
	language,
	setLanguage,
	children = [],
}) => {
	const [hidden, setHidden] = useState(false);
	const [openParent, setOpenParent] = useState<Navigation | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

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
										{navData.map(parent => {
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

								<div className="btn-wrapper grid-item-btns">{children}</div>
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
								{navData.map(parent => {
									const hasChildren = parent.children.length > 0;

									const linkClassName = classNames("mob-nav-link", {
										"mob-nav-link--active":
											pathname.split("/").includes(parent.key) ||
											(pathname === "/" && parent.key === "main"),
									});

									if (hasChildren) {
										return (
											<MobAccordionComponent
												key={parent.key}
												summary={
													<li key={parent.id} className={linkClassName}>
														{parent.caption}
													</li>
												}
												details={parent.children.map(child => {
													const linkClassName = classNames("mob-nav-link", {
														"mob-nav-link--active": pathname
															.split("/")
															.includes(child.key),
													});
													return (
														<div key={child.id}>
															<Link
																to={`/${parent.key}/${child.key}`}
																onClick={closeModal}
																className={linkClassName}
															>
																{child.caption}
															</Link>
														</div>
													);
												})}
											/>
										);
									}

									return (
										<li key={parent.id} className={linkClassName}>
											<Link
												to={`/${parent.key}`}
												className={linkClassName}
												onClick={closeModal}
											>
												{parent.caption}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>

						<div style={{ marginTop: "20px" }}>
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
						</div>
						<div className="mobHeaderBtnWrapper">
							<Button variant="secondary" href="/auth/registration">
								{btnCaptions.quick_start}
							</Button>
							<Button variant="primary" href="/auth/authorization">
								{btnCaptions.entry}
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Header;
