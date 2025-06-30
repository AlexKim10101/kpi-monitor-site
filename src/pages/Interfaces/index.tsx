import React, { useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./Interafces.module.css";
import Button from "@components/CustomButton";
import { useInterfaceData, useFiles } from "@api/model";
import Loader from "@components/Loader";
import { InterfaceDataItem, Component } from "types/interfaces";
import { interfaceDataParser } from "./utils/dataParser";
import { DataItemSchema } from "../../types/schemas/interfaceData";
import TabComponent from "@components/TabComponent";
import Tab from "@mui/material/Tab";
import { fakeAdminDescription } from "@consts/consts";
import { getDinamiContent } from "./getContent";
import { getImageUrl } from "../../utils/getImageUrl";
import ScalingImgEithBtn from "@components/ScalingImgWithBtn";
import { Box, Modal } from "@mui/material";
import { getModalSx, getTintSx } from "@components/Modal/getModalStyles";
import RegistrationForm from "@components/Forms/registrationForm";

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
	// const {
	// 	data: fileData,
	// 	isLoading: iLoadingFileData,
	// 	error: errorFileData,
	// } = useFiles();

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

	// console.log(
	// 	"fileData",
	// 	fileData!.sort((a, b) => a.id - b.id)
	// );

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
	// console.log("heading_userinterface", captions.heading_userinterface);
	// console.log("description_userinterface", captions.description_userinterface);
	// console.log("heading_demo", captions.heading_demo);
	// console.log("heading_widgets", captions.heading_widgets);
	// console.log("description_widgets", captions.description_widgets);
	// console.log("description_demouser", captions.description_demouser);
	// console.log("placeholder_name", captions.placeholder_name);

	// console.log("userData", userData);
	// console.log("adminData", adminData);

	const [value, setValue] = useState(0);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const tabsTitles = ["Интерфейс пользователя", "Интерфейс администратора"];
	const currentData = data[value];
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const getStaticContent = (isUser: boolean) => {
		return (
			<div className={styles.staticContent}>
				<div className={styles.infoBlock}>
					<div className={classNames("section-title", styles.subtitle)}>
						{captions.heading_demo}
					</div>
					<div className={styles.description}>
						{isUser ? captions.description_demouser : fakeAdminDescription}
					</div>

					<div className={styles.imgBlock}>
						<ScalingImgEithBtn
							path={getImageUrl("/uploads/demo_23d3d55044.png")}
							alt="demo-img"
							btnCaption={btnCaptions.demo}
							onClick={isUser ? undefined : handleOpen}
						/>
					</div>
				</div>

				{isUser && (
					<div className={styles.infoBlock}>
						<div className={classNames("section-title", styles.subtitle)}>
							{captions.heading_widgets}
						</div>
						<div className={styles.description}>
							{captions.description_widgets}
						</div>
					</div>
				)}
			</div>
		);
	};

	const titleImgSrc =
		value === 0 ? "/images/user_int_img.png" : "/images/admin_int_img.png";

	return (
		<div className={styles.wrapper}>
			<section className={classNames("section", styles.topSection)}>
				<div className={styles.container}>
					<div className="section-title">{captions.heading_userinterface}</div>
					<div className={classNames(styles.description, styles.mt15)}>
						{captions.description_userinterface}
					</div>
					<Button variant="accent">{btnCaptions.demo}</Button>
				</div>

				<div className={styles.imgContainer}>
					<img src={titleImgSrc} alt="title_int_img" />
				</div>
			</section>
			<section className={classNames("section", styles.contentSection)}>
				<div className={styles.tabsWrapper}>
					<div className={styles.border}></div>

					<TabComponent
						value={value}
						handleChange={handleChange}
						tabs={tabsTitles.map((title, index) => (
							<Tab key={index} value={index} label={title} disableRipple />
						))}
					>
						<div className={styles.tabComponentContent}>
							{getStaticContent(value === 0)}
							{currentData.map(getDinamiContent)}
						</div>
					</TabComponent>
				</div>
			</section>

			<Modal open={open} onClose={handleClose} sx={getTintSx()}>
				<Box sx={getModalSx()}>
					<RegistrationForm
						onClose={handleClose}
						title="Зарегистрируйтесь для доступа к возможностям администратора"
						captions={captions}
						btnCaptions={btnCaptions}
					/>
				</Box>
			</Modal>
		</div>
	);
};

export default DataWrapper;
