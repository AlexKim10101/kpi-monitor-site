import React from "react";
import { Operation } from "@api/interfaces";
import classNames from "classnames";
import style from "./nav.module.css";

type INavSectionProps = {
	operations: Operation[];
	scrollToTarget: (id: string) => void;
};

const NavSection: React.FC<INavSectionProps> = ({
	operations,
	scrollToTarget,
}) => {
	return (
		<section className={classNames("section", style.navSection)}>
			<div className={style.navFunctionDescription}>
				<div className="section-title">Справочник функций</div>
				<div className={style.navDescriptionText}>
					На этой странице вы можете ознакомиться с функциями и параметрами,
					доступными в программе KPI MONITOR.
					<br />
					Многолетний опыт в сфере BI-решений помог нам собрать исчерпывающий
					набор функций для эффективной и удобной работы с нашим продуктом.
				</div>
			</div>
			<div className={style.navFunctionList}>
				{operations.map((item, index) => (
					<div
						className="nav-function-item"
						key={index}
						onClick={() => scrollToTarget(item.documentId)}
					>
						{item.point}
					</div>
				))}
			</div>
		</section>
	);
};

export default NavSection;
