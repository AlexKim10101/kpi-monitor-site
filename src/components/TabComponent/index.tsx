import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { PRIMARY_COLOR } from "../../consts/consts";
import Button from "@components/CustomButton";
import { URL_ADDRESS } from "@consts/paths";
import { Solution } from "@api/interfaces";
import { getImageUrl } from "../../utils/getImageUrl";

type ITabComponent = {
	solutions: Solution[];
	btnCaptions: Record<string, string>;
};

const TabComponent: React.FC<ITabComponent> = ({ solutions, btnCaptions }) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const solution = solutions[value];

	return (
		<div className="solution-container">
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column-reverse",
				}}
			>
				<Box
					sx={{
						width: "100%",
						borderBottom: "2px solid #AABEFA",
						position: "relative",
						top: "-2px",
					}}
				></Box>

				<Tabs
					value={value}
					onChange={handleChange}
					sx={{
						"& .MuiTabs-list": {
							justifyContent: "space-between",
						},

						"& .MuiTabs-indicator": { height: "2px" },

						"& .MuiTab-root": {
							color: "#AABEFA",
							fontFamily: "Ubuntu",
							fontSize: "16px",
							fontStyle: "normal",
							fontWeight: "400",
							lineHeight: "normal",
							"&:hover": {
								color: PRIMARY_COLOR,
							},
							"&.Mui-selected": {
								color: PRIMARY_COLOR,
								fontWeight: "700",
							},
						},
					}}
				>
					{solutions.map((s, index) => (
						<Tab key={s.id} value={index} label={s.caption} disableRipple />
					))}
				</Tabs>
			</Box>
			<div className="solution-content">
				<div className="solution-picture">
					<img
						src={getImageUrl(solution?.picture?.formats.medium.url)}
						alt={solution?.picture?.name}
					/>
					<div className="sol-btn-wrap">
						<Button variant="primary" size="medium">
							{btnCaptions.demo}
						</Button>
					</div>
				</div>
				<div className="solution-description">
					<div className="description-text">{solution?.description}</div>
					<Button variant="secondary" size="medium">
						{btnCaptions.quick_start}
					</Button>
				</div>
			</div>
		</div>
	);
};
export default TabComponent;
