import React from "react";

import Icon from "../components/icon";
import Button from "../components/CustomButton";
import Operations from "../widgets/sections/operations";

type IInfoPageProps = {};

const InfoPage: React.FC<IInfoPageProps> = () => {
	const navigationItems = [
		"Операторы",
		"Математические функции",
		"Строковые значения",
		"Работа с датами",
		"Дополнительные функции Мастера настройки импорта",
		"Вычисление значений показателей",
		"Дополнительные функции Карт KPI",
		"Параметры",
	];
	return (
		<>
			<section className="nav-section">
				<div className="nav-function-description">
					<div className="nav-section-title">Справочник функций</div>
					<div className="nav-description-text">
						На этой странице вы можете ознакомиться с функциями и параметрами,
						доступными в программе KPI MONITOR.
						<br />
						Многолетний опыт в сфере BI-решений помог нам собрать исчерпывающий
						набор функций для эффективной и удобной работы с нашим продуктом.
					</div>
				</div>
				<div className="nav-function-list">
					{navigationItems.map((item, index) => (
						<div className="nav-function-item" key={index}>
							{item}
						</div>
					))}
				</div>
			</section>
			<Operations />
		</>
	);
};

export default InfoPage;
