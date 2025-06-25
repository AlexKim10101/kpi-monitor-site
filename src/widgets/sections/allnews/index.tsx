import { Link, useLocation } from "react-router";
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
	const { pathname } = useLocation();

	return (
		<section className="section">
			<div className={style.grid}>
				{news.map(n => (
					<Link to={pathname + `/article/${n.id}`}>
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
								<Button
									variant="secondary"
									href={pathname + `/article/${n.id}`}
								>
									{btnCaptions.details}
								</Button>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default AllNewsSection;
