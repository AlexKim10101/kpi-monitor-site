import React from "react";
import Button from "@components/CustomButton";
import { fakeStages } from "../../../consts/consts";
import "./stages.css";

type IStagesProps = {};

const Stages: React.FC<IStagesProps> = () => {
	return (
		<section className="stages-section">
			<div className="stage-header">
				<div className="section-title">
					Оставьте заявку, и мы сразу начнем работу
				</div>
				<Button variant="secondary">Быстрый старт</Button>
			</div>

			<div className="stages-list">
				{fakeStages.map((s, i) => (
					<div key={i} className="stage-list-item">
						<div className="stage-title">{s.title}</div>
						<div className="stage-description">
							{s.content.map((item, i) => (
								<div key={i}>{item}</div>
							))}
						</div>
						<div className="stage-icon">
							<img
								src={`/icons/num_${i + 1}.svg`}
								alt="icon_num"
								width={65}
								height={110}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Stages;
