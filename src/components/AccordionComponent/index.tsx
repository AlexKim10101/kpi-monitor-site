import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import DownArrowIcon from "@assets/icons/down-arrow.svg";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionComponentProps = {
	key: number | string;
	title: string | null;
	subtitle: string;
	children: React.ReactNode[];
};

const AccordionComponent: React.FC<AccordionComponentProps> = ({
	title,
	subtitle,
	children,
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
					margin: 0,
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

				"& .MuiAccordion-heading:hover": {
					border: "1px solid #aabef9",
				},

				"&.Mui-expanded .MuiAccordion-heading:hover": {
					border: "1px solid #E1E9FF",
				},

				"&.MuiAccordion-root .Mui-expanded": {
					margin: 0,
				},

				"&.MuiAccordion-root.Mui-expanded": {
					margin: 0,
				},

				"& .MuiAccordionSummary-content": {
					display: "block",
					alignSelf: "center",
					margin: 0,
				},

				"& .MuiAccordionSummary-root.Mui-expanded": {
					minHeight: "unset",
				},

				"& .MuiButtonBase-root": {
					minHeight: "unset",
					gap: "15px",

					display: "flex",
					padding: "10px",
					alignItems: "flex-start",
				},

				"@media (min-width: 1025px)": {
					"& .MuiButtonBase-root": {
						padding: "15px",
					},
				},
			}}
		>
			<AccordionSummary expandIcon={<DownArrowIcon />}>
				<span className="operation-title-wrapper">
					<span className="operation-title">{title}</span>
					<span>{` `}</span>
					<span className="operation-subtitle">{subtitle}</span>
				</span>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					"&.MuiAccordionDetails-root": {
						marginTop: "10px",
						border: "1px solid  #E1E9FF",
						borderRadius: "10px",
						background: "#FEFEFF",
						boxShadow: "0px 2px 20px 0px rgba(45, 86, 206, 0.05)",
						padding: "20px 15px",
					},
					"@media (min-width: 1025px)": {
						"&.MuiAccordionDetails-root": {
							marginTop: "15px",
							padding: "30px",
						},
					},
				}}
			>
				<div className="operation-content">{children}</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default AccordionComponent;
