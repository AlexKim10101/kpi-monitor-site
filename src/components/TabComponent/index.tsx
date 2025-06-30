import Tabs from "@mui/material/Tabs";
import classNames from "classnames";
import style from "./Tabs.module.css";
import { getTabsSx } from "./utils/getTabsSx";

type ITabComponent = {
	value: number;
	tabs: React.ReactNode[];
	children: React.ReactNode | React.ReactNode[];
	handleChange: (event: React.SyntheticEvent, newValue: number) => void;
};

const TabComponent: React.FC<ITabComponent> = ({
	value,
	tabs,
	children,
	handleChange,
}) => {
	return (
		<div className={style.container}>
			<div className={style.tabsWrapper}>
				<div className={style.tabsBorder} />
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					allowScrollButtonsMobile={false}
					scrollButtons={false}
					sx={getTabsSx()}
				>
					{tabs}
				</Tabs>
			</div>
			{children}
		</div>
	);
};
export default TabComponent;
