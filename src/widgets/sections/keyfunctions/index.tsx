import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, urls } from "../../../consts/consts";
import { ListItem } from "@mui/material";
import { IFunctionData } from "../../../types";
import Button from "@components/CustomButton";
import Icon from "@components/icon";
import { useKeyFunctoins } from "../../../api/model";

import "./functions.css";

type IKeyFunctionsProps = { captions: Record<string, string> };

const KeyFunctions: React.FC<IKeyFunctionsProps> = ({ captions }) => {
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
								<Button variant="secondary">Подробнее</Button>
							</div>
							<div className="function-icon">
								<Icon
									id={String(f.icon.id)}
									path={BASE_URL + f.icon.url}
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
