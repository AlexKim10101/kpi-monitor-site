import React from "react";
import Button from "@components/CustomButton";
import Icon from "@components/icon";
import { useKeyFunctoins } from "@api/model";
import { getImageUrl } from "../../../utils/getImageUrl";
import "./functions.css";

type IKeyFunctionsProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const KeyFunctions: React.FC<IKeyFunctionsProps> = ({
	captions,
	btnCaptions,
}) => {
	const { data, isLoading, error } = useKeyFunctoins();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="function-section">
			<div className="section-title">{captions.heading_key_features}</div>
			<div className="function-grid">
				{data.map(f => {
					return (
						<div key={String(f.id)} className="function-grid-item">
							<div className="function-title">{f.title}</div>
							<div className="function-description">{f.description}</div>
							<div className="function-btn-wrapper">
								<Button variant="secondary">{btnCaptions.learn_more}</Button>
							</div>
							<div className="function-icon">
								<Icon
									id={String(f.icon.id)}
									path={getImageUrl(f.icon.url)}
									width={f.icon.width}
									height={f.icon.height}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default KeyFunctions;
