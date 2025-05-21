import React from "react";
import "./solutions.css";
import TabComponent from "@components/TabComponent";
import { useQuery } from "@tanstack/react-query";
import { urls } from "../../../consts/consts";
import { useSolutions } from "../../../api/model";

type ISolutionsSectionProps = { captions: Record<string, string> };

const SolutionsSection: React.FC<ISolutionsSectionProps> = ({ captions }) => {
	// const solutionsQuery = useQuery({
	// 	queryKey: ["solutions"],
	// 	queryFn: () => fetch(urls.solutions).then(res => res.json()),
	// });

	// const solutions =
	// 	solutionsQuery && solutionsQuery.data ? solutionsQuery.data.data : [];

	const { data, isLoading, error } = useSolutions();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="solutions-section">
			<div className="section-title">{captions.heading_solutions}</div>
			<TabComponent solutions={data} />
		</section>
	);
};

export default SolutionsSection;
