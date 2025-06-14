import React from "react";
import { Link, useLocation } from "react-router";
import classNames from "classnames";
import Button from "@components/CustomButton";
import { getPathname } from "../../utils/getPathName";
import { locationsDict } from "@consts/consts";
import KpiMonitorIcon from "@assets/icons/kpi_logo.svg";
import ClipPathGroup from "@assets/icons/Clip-path-group.svg";

import "./footer.css";

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
		<footer className="footer">
			<div className="footer-desk-container">
				<div className="footer-desc-content">
					<Link to={logo.to}>
						{/* <Box
							component="img"
							src={logo.url}
							alt="Kpi logo"
							sx={{
								width: "235px",
								height: "44px",
							}}
						/> */}
						<KpiMonitorIcon />
					</Link>

					<div className="footer-nav-container">
						<nav>
							<ul className="nav-list nav-list-footer">
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

						<div className="btn-wrapper btn-wrapper-footer">
							<Button variant="secondary">{btnCaptions.quick_start}</Button>
							<Button variant="primary">{btnCaptions.entry}</Button>
						</div>
					</div>

					<div className="footer-contacts-container">
						<div className="footer-title">
							{captions.heading_footer_contacts}
						</div>

						<div className="contact-info">
							<div className="address">{captions.footer_adress}</div>
							<div className="phone-and-email">
								<div className="phone">
									{phoneNumbers.map((pn, i) => (
										<div key={pn + "index" + i}>{pn}</div>
									))}
								</div>
								<div className="email">{captions.footer_email}</div>
							</div>
							{/* <Icon
								path="/icons/Clip-path-group.svg"
								id="Clip-path-group"
								width={62}
								height={77}
							/> */}
							<ClipPathGroup />
						</div>
					</div>
				</div>

				<div className="footer-desc-signa">
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
