import React from "react";
import Button from "@components/CustomButton";
import { useStages } from "../../../api/model";
import { BASE_URL, fakeStages } from "../../../consts/consts";
import "./stages.css";

type IStagesProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const Stages: React.FC<IStagesProps> = ({ captions, btnCaptions }) => {
	const { data, isLoading, error } = useStages();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="stages-section">
			<div className="stage-header">
				<div className="section-title">{captions.heading_request}</div>
				<Button variant="secondary">{btnCaptions.quick_start}</Button>
			</div>

			<div className="stages-list">
				{data.map((s, i) => (
					<div key={i} className="stage-list-item">
						<div className="stage-title">{s.title}</div>
						<div className="stage-description">
							{s.description.split("\n").map((item, i) => (
								<div key={i}>{item}</div>
							))}
						</div>
						<div className="stage-icon">
							<img
								src={BASE_URL + s.icon.url}
								alt={s.icon.name}
								width={s.icon.width}
								height={s.icon.height}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Stages;
