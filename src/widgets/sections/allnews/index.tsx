import React from "react";
import { AllNews } from "@api/interfaces";
import { getImageUrl } from "../../../utils/getImageUrl";
import formatDateToDDMMYYYY from "../../../utils/dateformatter";
import style from "./allNews.module.css";
import Button from "@components/CustomButton";

type IAllNewsSectionProps = {
	news: AllNews[];
	btnCaptions: Record<string, string>;
};

const AllNewsSection: React.FC<IAllNewsSectionProps> = ({
	news,
	btnCaptions,
}) => {
	return (
		<section className="section">
			<div className={style.grid}>
				{news.map(n => (
					<div key={n.id} className={style.gridItem}>
						<img
							className={style.image}
							src={getImageUrl(n.picture[0].url)}
							alt={n.title}
						/>
						<div className={style.gridItemTint}></div>

						<div className={style.itemLabel}>
							<div className={style.itemDate}>
								{formatDateToDDMMYYYY(n.date)}
							</div>
							<div className={style.itemTitle}>{n.title}</div>
						</div>
						<div className={style.itemDescription}>
							<div className={style.itemDescriptionText}>{n.description}</div>
							<Button variant="secondary">{btnCaptions.details}</Button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default AllNewsSection;
