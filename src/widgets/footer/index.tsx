import React from "react";
import { Link, useLocation } from "react-router";
import classNames from "classnames";
import Button from "@components/CustomButton";
import { getPathname } from "../../utils/getPathName";
import { locationsDict } from "@consts/consts";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import KpiMonitorIconMob from "@assets/icons/kpi_logo_mob.svg";

import ClipPathGroup from "@assets/icons/Clip-path-group.svg";

import style from "./footer.module.css";

type ILinkData = {
	key: string;
	caption: string;
};

type IFooter = {
	logo: { url: string; to: string };
	links: Record<string, any>[];
	btnCaptions: Record<string, string>;
	captions: Record<string, string>;
};

const Footer: React.FC<IFooter> = ({ logo, links, btnCaptions, captions }) => {
	const { pathname } = useLocation();

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

						<div className={style.btnWrapperFooter}>
							<Button variant="secondary">{btnCaptions.quick_start}</Button>
							<Button variant="primary">{btnCaptions.entry}</Button>
						</div>
					</div>

					<div className={style.footerContactsContainer}>
						<div className="section-title">
							{captions.heading_footer_contacts}
						</div>

						<div className={style.contactInfo}>
							<div className="address">{captions.footer_adress}</div>
							<div className={style.phoneAndEmail}>
								<div className="phone">
									{phoneNumbers.map((pn, i) => (
										<div key={pn + "index" + i}>{pn}</div>
									))}
								</div>
								<div className="email">{captions.footer_email}</div>
							</div>
							<div className={classNames(style.mobileCenter, style.mt25Mob)}>
								<ClipPathGroup />
							</div>
						</div>
					</div>
				</div>

				<div className={style.footerDescSigna}>
					© 2010 KPI MONITOR - Автоматизация ключевых показателей эффективности
					(KPI) предприятия. Все права защищены. Публикация любых материалов
					сайта возможна только с разрешения владельца.{" "}
					<Link
						to="https://kpi-monitor.ru/terms-of-use"
						target="_blank"
						rel="noopener noreferrer"
					>
						Пользовательское соглашение
					</Link>{" "}
					|{" "}
					<Link
						to="https://kpi-monitor.ru/privacy-policy"
						target="_blank"
						rel="noopener noreferrer"
					>
						Политика конфиденциальности
					</Link>{" "}
					.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
