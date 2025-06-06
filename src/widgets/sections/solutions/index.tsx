import React from "react";
import TabComponent from "@components/TabComponent";
import { useSolutions } from "@api/model";
import "./solutions.css";

type ISolutionsSectionProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const SolutionsSection: React.FC<ISolutionsSectionProps> = ({
	captions,
	btnCaptions,
}) => {
	const { data, isLoading, error } = useSolutions();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="solutions-section">
			<div className="section-title">{captions.heading_solutions}</div>
			<TabComponent solutions={data} btnCaptions={btnCaptions} />
		</section>
	);
};

export default SolutionsSection;
