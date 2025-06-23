import React from "react";
import { Outlet } from "react-router";
import classNames from "classnames";
import style from "./Auth.module.css";

type AutorisationProps = {};

const Autorisation: React.FC<AutorisationProps> = () => {
	return (
		<section className={classNames("section", style.formSection)}>
			<div className={style.textContainer}>
				<div className="section-title">
					Начните использовать KPI MONITOR прямо сейчас!
				</div>
				<div className={style.subtitle}>
					Вместе с регистрацией вы получаете:
				</div>
				<div className={style.tagsList}>
					<div className={style.tag}>Полную версию KPI MONITOR*</div>
					<div className={style.tag}>Прайс-лист</div>
					<div className={style.tag}>Организация презентации</div>
					<div className={style.tag}>Методические материалы</div>
				</div>
				<div className={style.signa}>
					*Доступ к KPI MONITOR предоставляется на 10 дней
				</div>
			</div>

			<div className={style.formContainer}>
				<Outlet />
			</div>
		</section>
	);
};

export default Autorisation;
