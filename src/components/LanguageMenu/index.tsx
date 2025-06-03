import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import { Locale } from "../../api/interfaces";

type ILanguageMenuProps = {
	locales: Locale[];
	setLanguage: (code: string) => void;
	language: string;
};

export const LanguageMenu: React.FC<ILanguageMenuProps> = ({
	locales,
	setLanguage,
	language,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (code: string) => {
		setLanguage(code);
		handleClose();
	};

	return (
		<div>
			<button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				style={{
					all: "unset",
				}}
			>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					padding={1.25}
					borderRadius="10px"
					border={1}
					borderColor="primary.main"
					sx={{ cursor: "pointer" }}
				>
					<Typography
						variant="button"
						color="primary.main"
						sx={{ lineHeight: 1 }}
					>
						{language}
					</Typography>
				</Box>
			</button>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				disableScrollLock
			>
				{locales.map(l => (
					<MenuItem
						key={l.id}
						onClick={() => {
							handleChange(l.code);
						}}
					>
						{l.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default LanguageMenu;
