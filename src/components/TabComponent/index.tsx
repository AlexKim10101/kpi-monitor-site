import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@components/CustomButton";
import { Solution } from "@api/interfaces";
import { getImageUrl } from "../../utils/getImageUrl";
import classNames from "classnames";
import style from "../../widgets/sections/solutions/solutions.module.css";

type ITabComponent = {
	solutions: Solution[];
	btnCaptions: Record<string, string>;
};

const TabComponent: React.FC<ITabComponent> = ({ solutions, btnCaptions }) => {
	const [value, setValue] = React.useState(0);
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		value !== newValue && setExpanded(false);
		setValue(newValue);
	};
	const solution = solutions[value];

	return (
		<div className={style.solutionContainer}>
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
						top: "-14px",

						"@media (min-width: 1025px)": {
							top: "-2px",
						},
					}}
				></Box>

				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					allowScrollButtonsMobile={false}
					scrollButtons={false}
					sx={{
						"& .MuiTabs-list": {
							// Убираем space-between, чтобы скролл работал
							justifyContent: "flex-start",
							overflowX: "auto",
							paddingBottom: "12px",
							gap: "30px",
						},

						"& .MuiTabs-indicator": {
							height: "2px",
							bottom: "12px",
							display: "none",
						},

						"& .MuiTab-root": {
							color: "#AABEFA",
							fontFamily: "Ubuntu",
							fontSize: "14px",
							fontStyle: "normal",
							fontWeight: "400",
							lineHeight: "normal",
							flexShrink: 0, // чтобы Tab не сжимался и был виден в scrollable режиме
							padding: "10px",
							"&:hover": {
								color: "var(--primary-color)",
							},
							"&.Mui-selected": {
								color: "var(--primary-color)",
								fontWeight: "700",
								borderBottom: "1px solid var(--primary-color)",
							},
						},

						"@media (min-width: 1025px)": {
							"& .MuiTab-root": {
								fontSize: "16px",

								"&.Mui-selected": {
									borderBottom: "1px solid transparent",
								},
							},

							"& .MuiTabs-list": {
								justifyContent: "space-between",
								paddingBottom: "0px",
							},

							"& .MuiTabs-indicator": {
								height: "2px",
								bottom: "0px",
								display: "block",
							},
						},
					}}
				>
					{solutions.map((s, index) => (
						<Tab key={s.id} value={index} label={s.caption} disableRipple />
					))}
				</Tabs>
			</Box>
			<div className={style.solutionContent}>
				<Button variant="secondary" size="medium" className="only-mobile">
					{btnCaptions.quick_start}
				</Button>
				<div className={style.solutionPicture}>
					<img
						src={getImageUrl(solution?.picture?.formats.medium.url)}
						alt={solution?.picture?.name}
					/>
					<div className={style.solBtnWrap}>
						<Button variant="primary" size="medium">
							{btnCaptions.demo}
						</Button>
					</div>
				</div>
				<div className={style.solutionDescription}>
					<div
						className={classNames(
							style.descriptionText,
							expanded && style.expanded
						)}
					>
						{solution?.description}
					</div>
					<button
						className={classNames(style.toggleButton, "only-mobile")}
						onClick={() => setExpanded(prev => !prev)}
					>
						{expanded ? "Скрыть" : "Показать больше"}
					</button>

					<Button variant="secondary" size="medium" className="only-desctop">
						{btnCaptions.quick_start}
					</Button>
				</div>
			</div>
		</div>
	);
};
export default TabComponent;
