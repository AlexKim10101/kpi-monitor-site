import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Button from "@components/CustomButton";
import Icon from "@components/icon";
import { useKeyFunctoins } from "@api/model";
import MobMenuListItemIcon from "@assets/icons/mob-menu-list-item-icon.svg";
import DownArrowIcon from "@assets/icons/down-arrow.svg";

import { getImageUrl } from "../../../utils/getImageUrl";
import style from "./functions.module.css";
import classNames from "classnames";

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
		<section className={classNames("section", "section-fullWidth")}>
			<div
				className={classNames(
					"section-title",
					"mob-padding",
					"section-fullWidth-title"
				)}
			>
				{captions.heading_key_features}
			</div>
			<div className={classNames(style.functionGrid)}>
				{data.map(f => {
					return (
						<div key={String(f.id)} className={style.functionGridItem}>
							<div className={style.functionTitle}>{f.title}</div>
							<div className={style.functionDescription}>{f.description}</div>
							<div className={style.functionBtnWrapper}>
								<Button variant="secondary">{btnCaptions.learn_more}</Button>
							</div>
							<div className={style.functionIcon}>
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

			<div className={style.functionAccordionContainer}>
				{data.map(f => (
					<Accordion
						sx={{
							"&.MuiAccordion-root": {
								borderTop: "1px solid  #AABEFA",
								background: "transparent",
								boxShadow: "none",
								display: "flex",
								flexDirection: "column",
								gap: "0px",
								margin: 0,
								padding: "15px 0px 5px 0px",
							},

							"&.MuiAccordion-root::before": {
								height: 0,
							},

							"& .MuiAccordion-heading": {
								border: "0px solid  #E1E9FF",
								background: "transparent",
								boxShadow: "none",
							},

							"& .MuiAccordion-heading:hover": {
								border: "0px solid #aabef9",
							},

							"&.Mui-expanded .MuiAccordion-heading:hover": {
								border: "0px solid #E1E9FF",
							},

							"&.MuiAccordion-root .Mui-expanded": {
								margin: 0,
							},

							"&.MuiAccordion-root.Mui-expanded": {
								margin: 0,
							},

							"& .MuiAccordionSummary-content": {
								fontSize: "14px",
								margin: 0,
							},

							"& .MuiAccordionSummary-root.Mui-expanded": {
								minHeight: "38px",
								fontWeight: 700,
							},

							"& .MuiButtonBase-root": {
								minHeight: "38px",
								gap: "15px",
								padding: 0,
							},
						}}
					>
						<AccordionSummary expandIcon={<MobMenuListItemIcon />}>
							{f.title}
						</AccordionSummary>
						<AccordionDetails
							sx={{
								"&.MuiAccordionDetails-root": {
									border: "0px solid  #E1E9FF",
									boxShadow: "none",
									padding: "10px 0px",
									display: "flex",
									flexDirection: "column",
									gap: "15px",
									position: "relative",
								},
							}}
						>
							<div className={style.funAccDescText}>{f.description}</div>
							<Button variant="secondary">{btnCaptions.details}</Button>
							<div className={style.functionIconAcc}>
								<Icon
									id={String(f.icon.id)}
									path={getImageUrl(f.icon.url)}
									width={f.icon.width}
									height={f.icon.height}
									needAdaptive
								/>
							</div>
						</AccordionDetails>
					</Accordion>
				))}
			</div>
		</section>
	);
};

export default KeyFunctions;
