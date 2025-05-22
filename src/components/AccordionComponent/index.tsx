import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import DownArrowIcon from "@assets/icons/down-arrow.svg";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionComponentProps = {
	key: number | string;
	title: string;
	children: React.ReactNode[];
};

const AccordionComponent: React.FC<AccordionComponentProps> = ({
	key,
	title,
	children,
}) => {
	return (
		<Accordion
			key={key}
			sx={{
				"&.MuiAccordion-root": {
					borderRadius: "10px",
					border: "0px solid  #E1E9FF",
					background: "transparent",
					boxShadow: "none",
					display: "flex",
					flexDirection: "column",
					gap: "15px",
					// padding: "15px",
				},
				"&.MuiAccordion-root::before": {
					height: 0,
				},
				"& .MuiAccordion-heading": {
					border: "1px solid  #E1E9FF",
					borderRadius: "10px",
					background: "#FEFEFF",
					boxShadow: "0px 2px 20px 0px rgba(45, 86, 206, 0.05)",
				},

				"&.MuiAccordion-root .Mui-expanded": {
					margin: 0,
				},

				"&.MuiAccordion-root.Mui-expanded": {
					margin: 0,
				},

				"& .MuiAccordionSummary-root.Mui-expanded": {
					minHeight: "48px",
				},
			}}
		>
			<AccordionSummary expandIcon={<DownArrowIcon />}>
				<div className="operation-title">{title}</div>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					"&.MuiAccordionDetails-root": {
						border: "1px solid  #E1E9FF",
						borderRadius: "10px",
						background: "#FEFEFF",
						boxShadow: "0px 2px 20px 0px rgba(45, 86, 206, 0.05)",
						padding: "15px",
					},
				}}
			>
				<div className="operation-content">{children}</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default AccordionComponent;
