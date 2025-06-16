import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import MobMenuListItemIcon from "@assets/icons/mob-menu-list-item-icon.svg";

import { Locale } from "../../api/interfaces";
import "./language-menu.css";

type IMobileLanguageMenuProps = {
	locales: Locale[];
	setLanguage: (code: string) => void;
	language: string;
	closeMenu: () => void;
};

const MobileLanguageMenu: React.FC<IMobileLanguageMenuProps> = ({
	locales,
	setLanguage,
	language,
	closeMenu,
}) => {
	const handleChange = (code: string) => {
		setLanguage(code);
		closeMenu();
	};

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
					marginTop: "25px",
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
					marginTop: "25px",
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
				<span
					style={{ textTransform: "uppercase" }}
					className="mob-accent-text"
				>
					{language}
				</span>
				&nbsp;
				<span className="mob-text">Choose your language</span>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					"&.MuiAccordionDetails-root": {
						border: "0px solid  #E1E9FF",
						borderRadius: "10px",
						background: "#FEFEFF",
						boxShadow: "none",
						padding: "10px 0px",
						display: "flex",
						flexDirection: "column",
						gap: "15px",
					},
				}}
			>
				{locales.map(l => (
					<div
						key={l.id}
						className="mob-text"
						onClick={() => handleChange(l.code)}
					>
						{l.name}
					</div>
				))}
			</AccordionDetails>
		</Accordion>
	);
};

export default MobileLanguageMenu;

// <Box
// 	display="flex"
// 	alignItems="center"
// 	justifyContent="center"
// 	padding={1.25}
// 	borderRadius="10px"
// 	border={1}
// 	borderColor="primary.main"
// 	sx={{ cursor: "pointer" }}
// >
// 	<Typography variant="button" color="primary.main" sx={{ lineHeight: 1 }}>
// 		{language}
// 	</Typography>
// </Box>;
