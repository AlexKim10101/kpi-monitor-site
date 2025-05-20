import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, urls } from "../../../consts/consts";
import { ListItem } from "@mui/material";
import { IFunctionData } from "../../../types";
import Button from "@components/CustomButton";
import Icon from "@components/icon";
import "./functions.css";

type IKeyFunctionsProps = {};

const KeyFunctions: React.FC<IKeyFunctionsProps> = () => {
	const functionTypesQuery = useQuery({
		queryKey: ["features"],
		queryFn: () => fetch(urls.features).then(res => res.json()),
	});

	console.log("functionTypesQuery!!!!", functionTypesQuery.data);
	const keyfunctions: IFunctionData[] =
		functionTypesQuery && functionTypesQuery.data
			? functionTypesQuery.data.data
			: [];

	return (
		<section className="function-section">
			<div className="section-title">Ключевые возможности KPI MONITOR</div>
			<div className="function-grid">
				{keyfunctions.map(f => {
					return (
						<div id={String(f.id)} className="function-grid-item">
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
