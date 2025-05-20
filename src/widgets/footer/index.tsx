import React from "react";
import { Link } from "react-router";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@components/CustomButton";
import Icon from "@components/icon";
import "./footer.css";

// import logoMim from "@mui/icons-material/Star";
// Assuming KpiLogo is a component that needs to be imported
// import { KpiLogo } from "./KpiLogo";

type IFooter = {
	logo: { url: string; to: string };
	links: Record<string, any>[];
};

const Footer: React.FC<IFooter> = ({ logo, links }) => {
	const [value, setValue] = React.useState(0);

	// const handleChange = (event, newValue) => {
	// 	setValue(newValue);
	// };

	const navItems = ["Главная", "О программе", "Решения", "Инфоцентр"];
	const phoneNumbers = [
		"+7 (495) 662-11-31",
		"+7 (495) 662-11-32",
		"+7 (495) 662-11-33",
	];

	return (
		<footer className="footer">
			<div className="footer-desk-container">
				<div className="footer-desc-content">
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

					<div className="footer-nav-container">
						<nav>
							<ul className="nav-list nav-list-footer">
								{links.map((link, index) => (
									<li key={index} className="nav-item">
										<Link to={""} className="nav-link">
											{link.caption}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<div className="btn-wrapper btn-wrapper-footer">
							<Button variant="secondary">Быстрый старт</Button>
							<Button variant="primary">Войти</Button>
						</div>
					</div>

					<div className="footer-contacts-container">
						<div className="footer-title">Контакты</div>

						<div className="contact-info">
							<div className="address">
								111250, г. Москва, проезд Завода «Серп и Молот», д. 6 корп. 1,
								Бизнес-центр «РОСТЭК»
							</div>
							<div className="phone-and-email">
								<div className="phone">
									{phoneNumbers.map(pn => (
										<div>{pn}</div>
									))}
								</div>
								<div className="email">info@kpi-monitor.ru</div>
							</div>
							<Icon
								path="/icons/Clip-path-group.svg"
								id="Clip-path-group"
								width={62}
								height={77}
							/>
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
