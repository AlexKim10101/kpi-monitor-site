import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./Interafces.module.css";
import Button from "@components/CustomButton";
import { useInterfaceData } from "@api/model";
import Loader from "@components/Loader";
import { InterfaceDataItem, Component } from "types/interfaces";
import { interfaceDataParser } from "./utils/dataParser";
import { DataItemSchema } from "../../types/schemas/interfaceData";
import TabComponent from "@components/TabComponent";
import Tab from "@mui/material/Tab";

type IDataWrapperProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

type InterfacePageProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
	data: [InterfaceDataItem[], InterfaceDataItem[]];
};

const DataWrapper: React.FC<IDataWrapperProps> = ({
	captions,
	btnCaptions,
}) => {
	const { data, isLoading, error } = useInterfaceData();

	if (isLoading) {
		return <Loader />;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	const result = DataItemSchema.array().safeParse(data);

	// if (!result.success) {
	// 	console.error("Ошибка валидации данных:", result.error.format());
	// 	return <p>Ошибка структуры данных</p>;
	// }

	const [userData, adminData] = interfaceDataParser(data);

	return (
		<InterfacePage
			btnCaptions={btnCaptions}
			captions={captions}
			data={[userData, adminData]}
		/>
	);
};

const InterfacePage: React.FC<InterfacePageProps> = ({
	captions,
	btnCaptions,
	data,
}) => {
	// heading_userinterface;
	// description_userinterface;
	// heading_demo;
	// heading_widgets;
	// description_widgets;
	// description_demouser;
	// placeholder_name;
	// console.log("heading_userinterface", captions.heading_userinterface);
	// console.log("description_userinterface", captions.description_userinterface);
	console.log("heading_demo", captions.heading_demo);
	console.log("heading_widgets", captions.heading_widgets);
	console.log("description_widgets", captions.description_widgets);
	console.log("description_demouser", captions.description_demouser);
	console.log("placeholder_name", captions.placeholder_name);

	// console.log("userData", userData);
	// console.log("adminData", adminData);

	const [value, setValue] = React.useState(0);
	const tabsTitles = ["Интерфейс пользователя", "Интерфейс администратора"];
	const currentData = data[value];
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className={styles.wrapper}>
			<section className={classNames("section", styles.topSection)}>
				<div className={styles.container}>
					<div className="section-title">{captions.heading_userinterface}</div>
					<div className={styles.description}>
						{captions.description_userinterface}
					</div>
					<Button variant="accent">{btnCaptions.demo}</Button>
				</div>

				<div className={styles.imgContainer}>
					<img src="/images/user_int_img.png" alt="user_int_img" />
				</div>
			</section>
			<section
				className={classNames(
					"section",
					"section-fullWidth",
					styles.contentSection
				)}
			>
				<div className={styles.tabsWrapper}>
					<div className={styles.border}></div>

					<TabComponent
						value={value}
						handleChange={handleChange}
						tabs={tabsTitles.map((title, index) => (
							<Tab key={index} value={index} label={title} disableRipple />
						))}
					>
						CONTENT
					</TabComponent>
				</div>
			</section>
		</div>
	);
};

export default DataWrapper;
