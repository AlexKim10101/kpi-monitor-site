import React from "react";
import { Link } from "react-router";
import classNames from "classnames";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Button from "@components/CustomButton";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import KpiMonitorIconMob from "@assets/icons/kpi_logo_mob.svg";
import ClipPathGroup from "@assets/icons/Clip-path-group.svg";
import { NavigationWithChildren } from "../../utils/getNavigationTree";
import style from "./footer.module.css";
import { removeNonDigits } from "../../utils/removeNonDigit";

type ILinkData = {
	key: string;
	caption: string;
};

type IFooter = {
	pathname: string;
	navData: NavigationWithChildren[];

	logo: { url: string; to: string };
	btnCaptions: Record<string, string>;
	captions: Record<string, string>;
	children?: React.ReactNode | React.ReactNode[];
};

const Footer: React.FC<IFooter> = ({
	logo,
	pathname,
	navData,
	btnCaptions,
	captions,
	children = [],
}) => {
	const phoneNumbers = captions.footer_phones
		? captions.footer_phones.split("\n")
		: [];

	return (
		<footer className={classNames(style.footer, "mob-padding")}>
			<div className={style.footerDeskContainer}>
				<div className={style.footerDescContent}>
					<Link to={logo.to} className={style.mobileCenter}>
						<div className="only-desctop">
							<KpiMonitorIcon />
						</div>
						<div className="only-mobile">
							<KpiMonitorIconMob />
						</div>
					</Link>

					<div className={style.footerNavContainer}>
						<nav>
							<ul className={style.navListFooter}>
								{navData.map((link, index) => {
									const linkClassName = classNames("nav-link", {
										"nav-link-active":
											pathname.split("/").includes(link.key) ||
											(pathname === "/" && link.key === "main"),
									});

									return (
										<li key={index} className="nav-item">
											<Link to={`/${link.key}`} className={linkClassName}>
												{link.caption}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>

						<div className={style.btnWrapperFooter}>{children}</div>
					</div>

					<div className={style.footerContactsContainer}>
						<div className="section-title">
							{captions.heading_footer_contacts}
						</div>

						<div className={style.contactInfo}>
							<div className="address">{captions.footer_adress}</div>
							<div className={style.phoneAndEmail}>
								<div className={style.phone}>
									{phoneNumbers.map((pn, i) => (
										<Link
											key={pn + "index" + i}
											className={style.phoneNumberLink}
											to={`tel:+${removeNonDigits(pn)}`}
										>
											{pn}
										</Link>
									))}
								</div>
								<div className="email">
									<Link
										className={style.phoneNumberLink}
										to={`mailto:${captions.footer_email}`}
									>
										{captions.footer_email}
									</Link>
								</div>
							</div>
							<div className={classNames(style.mobileCenter, style.mt25Mob)}>
								<ClipPathGroup />
							</div>
						</div>
					</div>
				</div>

				<div className={style.footerDescSigna}>
					<Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
						{captions.footer_copyright}
					</Markdown>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
