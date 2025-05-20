import React from "react";
import "./solutions.css";
import TabComponent from "@components/TabComponent";
import { useQuery } from "@tanstack/react-query";
import { urls } from "../../../consts/consts";

type ISolutionsSectionProps = {};

const SolutionsSection: React.FC<ISolutionsSectionProps> = () => {
	const solutionsQuery = useQuery({
		queryKey: ["solutions"],
		queryFn: () => fetch(urls.solutions).then(res => res.json()),
	});
	console.log("solutionsQuery", solutionsQuery.data);

	const solutions =
		solutionsQuery && solutionsQuery.data ? solutionsQuery.data.data : [];

	return (
		<section className="solutions-section">
			<div className="section-title">Создаем решения для разных индустрий</div>
			{solutions.length > 0 && <TabComponent solutions={solutions} />}
		</section>
	);
};

export default SolutionsSection;
