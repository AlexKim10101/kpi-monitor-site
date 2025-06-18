import React, { useMemo, useRef, useState } from "react";
import throttle from "lodash.throttle";
import NavSection from "../widgets/sections/nav";
import Operations from "../widgets/sections/operations";
import FloatingTabs from "@components/FloatingTabs";
import Loader from "@components/Loader";
import { Operation } from "@api/interfaces";
import { useOperations } from "@api/model";

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
			<NavSection operations={operations} scrollToTarget={scrollToTarget} />
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
