import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./Interafces.module.css";
import Button from "@components/CustomButton";
import { useInterfaceData } from "@api/model";
import Loader from "@components/Loader";
import { InterfaceDataItem, Component } from "types/interfaces";
import { interfaceDataParser } from "./utils/dataParser";

type IDataWrapperProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

type InterfacePageProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
	userData: InterfaceDataItem[];
	adminData: InterfaceDataItem[];
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

	const [userData, adminData] = interfaceDataParser(data);

	return (
		<InterfacePage
			btnCaptions={btnCaptions}
			captions={captions}
			userData={userData}
			adminData={adminData}
		/>
	);
};

const InterfacePage: React.FC<InterfacePageProps> = ({
	captions,
	btnCaptions,
	adminData,
	userData,
}) => {
	// heading_userinterface;
	// description_userinterface;
	// heading_demo;
	// heading_widgets;
	// description_widgets;
	// description_demouser;
	// placeholder_name;

	// console.log("userData", userData);
	// console.log("adminData", adminData);

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
		</div>
	);
};

export default DataWrapper;
