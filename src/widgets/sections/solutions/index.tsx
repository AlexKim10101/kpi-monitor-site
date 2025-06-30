import React from "react";
import TabComponent from "@components/TabComponent";
import Tab from "@mui/material/Tab";

import { useSolutions } from "@api/model";
import style from "./solutions.module.css";
import classNames from "classnames";
import Loader from "@components/Loader";
import { Solution } from "@api/interfaces";
import Button from "@components/CustomButton";
import { getImageUrl } from "../../../utils/getImageUrl";
import ScalingImgEithBtn from "@components/ScalingImgWithBtn";

type IDataWrapperProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

type ISolutionsSectionProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
	solutions: Solution[];
};

const DataWrapper: React.FC<IDataWrapperProps> = ({
	captions,
	btnCaptions,
}) => {
	const { data: solutions, isLoading, error } = useSolutions();

	if (isLoading) {
		return <Loader />;
	}

	if (error || !solutions) return <p>Ошибка загрузки данных</p>;

	return (
		<SolutionsSection
			btnCaptions={btnCaptions}
			captions={captions}
			solutions={solutions}
		/>
	);
};

const SolutionsSection: React.FC<ISolutionsSectionProps> = ({
	captions,
	btnCaptions,
	solutions,
}) => {
	const [value, setValue] = React.useState(0);
	const [expanded, setExpanded] = React.useState(false);

	const solution = solutions[value];

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		value !== newValue && setExpanded(false);
		setValue(newValue);
	};

	return (
		<section className={classNames("section", style.solutionsSection)}>
			<div className="section-title">{captions.heading_solutions}</div>
			<TabComponent
				value={value}
				handleChange={handleChange}
				tabs={solutions.map((s, index) => (
					<Tab key={s.id} value={index} label={s.caption} disableRipple />
				))}
			>
				<div className={style.content}>
					<Button
						variant="secondary"
						size="medium"
						className="only-mobile"
						href="/auth/registration"
					>
						{btnCaptions.quick_start}
					</Button>
					<div className={style.solutionPicture}>
						<ScalingImgEithBtn
							path={getImageUrl(solution?.picture?.formats.medium.url)}
							alt={solution?.picture?.name}
							btnCaption={btnCaptions.demo}
						/>
						{/* <img
						src={getImageUrl(solution?.picture?.formats.medium.url)}
						alt={solution?.picture?.name}
					/>
					<div className={style.solutionBtnWrap}>
						<Button variant="primary" size="medium">
							{btnCaptions.demo}
						</Button>
					</div> */}
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

						<Button
							variant="secondary"
							size="medium"
							className="only-desctop"
							href="/auth/registration"
						>
							{btnCaptions.quick_start}
						</Button>
					</div>
				</div>
			</TabComponent>
		</section>
	);
};

export default DataWrapper;
