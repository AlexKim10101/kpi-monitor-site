import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import MobMenuListItemIcon from "@assets/icons/mob-menu-list-item-icon.svg";

type IMobAccordionComponentProps = {
	summary: React.ReactNode;
	details: React.ReactNode | React.ReactNode[];
};

const MobAccordionComponent: React.FC<IMobAccordionComponentProps> = ({
	summary,
	details,
}) => {
	return (
		<Accordion
			sx={{
				"&.MuiAccordion-root": {
					borderRadius: "10px",
					border: "0px solid  #E1E9FF",
					background: "transparent",
					boxShadow: "none",
					display: "flex",
					flexDirection: "column",
					gap: "0px",
					margin: 0,
					// marginTop: "25px",
				},

				"&.MuiAccordion-root::before": {
					height: 0,
				},

				"& .MuiAccordion-heading": {
					border: "0px solid  #E1E9FF",
					borderRadius: "10px",
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
					// marginTop: "25px",
				},

				"& .MuiAccordionSummary-content": {
					margin: 0,
				},

				"& .MuiAccordionSummary-root.Mui-expanded": {
					minHeight: "unset",
				},

				"& .MuiButtonBase-root": {
					minHeight: "unset",
					gap: "15px",
					padding: 0,
				},
			}}
		>
			<AccordionSummary expandIcon={<MobMenuListItemIcon />}>
				{summary}
			</AccordionSummary>
			<AccordionDetails
				sx={{
					"&.MuiAccordionDetails-root": {
						border: "0px solid  #E1E9FF",
						borderRadius: "10px",
						background: "#FEFEFF",
						boxShadow: "none",
						padding: "10px 0px 0px 10px",
						display: "flex",
						flexDirection: "column",
						gap: "15px",
					},
				}}
			>
				{details}
			</AccordionDetails>
		</Accordion>
	);
};

export default MobAccordionComponent;
