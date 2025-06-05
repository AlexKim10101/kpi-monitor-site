import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import throttle from "lodash.throttle";
import Operations from "../widgets/sections/operations";
import { useOperations } from "../api/model";
import FloatingTabs from "@components/FloatingTabs";
import { Operation } from "../api/interfaces";
import Loader from "@components/Loader";

type IInfoPageProps = { operations: Operation[] };

const DataWrapper: React.FC<{}> = () => {
	const { data, isLoading, error } = useOperations();

	if (isLoading) {
		return <Loader />;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	const operations = data.sort((a, b) => a.order - b.order);

	return <InfoPage operations={operations} />;
};

const InfoPage: React.FC<IInfoPageProps> = ({ operations }) => {
	const [activeTab, setActiveTab] = useState(operations[0]?.documentId);

	const activeObserverRef = useRef(true);

	const scrollToTarget = (id: string) => {
		const el = document.getElementById(id);
		setActiveTab(id);
		activeObserverRef.current = false;
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		setTimeout(() => {
			activeObserverRef.current = true;
		}, 600);
	};

	const throttledHandler = useMemo(
		() =>
			throttle((id: string) => {
				if (activeObserverRef.current) {
					setActiveTab(id);
				}
			}, 0),
		[]
	);

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
					{operations.map((item, index) => (
						<div
							className={classNames("nav-function-item", {
								"nav-function-item-active": activeTab === item.documentId,
							})}
							key={index}
							onClick={() => scrollToTarget(item.documentId)}
						>
							{item.point}
						</div>
					))}
				</div>
			</section>
			<FloatingTabs
				operations={operations}
				activeTab={activeTab}
				setActiveTab={throttledHandler}
			/>
			<Operations operations={operations} />
		</>
	);
};

export default DataWrapper;
