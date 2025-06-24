import React from "react";
import Button from "@components/CustomButton";
import { useStages } from "@api/model";
import { getImageUrl } from "../../../utils/getImageUrl";
import styles from "./stages.module.css";

type IStagesProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const Stages: React.FC<IStagesProps> = ({ captions, btnCaptions }) => {
	const { data, isLoading, error } = useStages();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	const sortedData = data.sort((a, b) => a.order - b.order);

	return (
		<section className="section section-flex">
			<div className={styles.stageHeader}>
				<div className="section-title">{captions.heading_request}</div>
				<Button
					variant="secondary"
					className="only-desctop"
					href="/auth/registration"
				>
					{btnCaptions.quick_start}
				</Button>
			</div>

			<div className={styles.stagesList}>
				{sortedData.map((s, i) => (
					<div key={i} className={styles.stageListItem}>
						<div className={styles.stageTitle}>{s.title}</div>
						<div className={styles.stageDescription}>
							{s.description.split("\n").map((item, i) => (
								<div key={i}>{item}</div>
							))}
						</div>
						<div className={styles.stageIcon}>
							<img
								src={getImageUrl(s.icon.url)}
								alt={s.icon.name}
								width={s.icon.width}
								height={s.icon.height}
							/>
						</div>
					</div>
				))}
			</div>
			<Button
				variant="secondary"
				className="only-mobile"
				href="/auth/registration"
			>
				{btnCaptions.quick_start}
			</Button>
		</section>
	);
};

export default Stages;
