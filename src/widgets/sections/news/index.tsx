import React from "react";
import Button from "@components/CustomButton";
import { useNews } from "@api/model";
import formatDateToDDMMYYYY from "../../../utils/dateformatter";
import NewsArrowIcon from "@assets/icons/news_arrow.svg";
import NewsArrowIconHover from "@assets/icons/news_arrow_hover.svg";

import style from "./news.module.css";
import classNames from "classnames";
import { Link } from "react-router";

type INewsProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const News: React.FC<INewsProps> = ({ captions, btnCaptions }) => {
	const { data, isLoading, error } = useNews();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className={classNames("section", "section-fullWidth")}>
			<div className={classNames(style.newsWrapper, "mob-padding")}>
				<div className="section-title">{captions.heading_news}</div>
				<div className={style.newsSectionContent}>
					<div className={style.newsList}>
						{data.map((n, i) => (
							<Link
								className={style.newsLink}
								key={n.id}
								to={`infocentre/news/article/${n.id}`}
							>
								<div className={style.newsListItem}>
									<div className={style.newsItemDate}>
										{n.date ? formatDateToDDMMYYYY(n.date) : ""}
									</div>
									<div className={style.newsItemTitle}>{n.title}</div>
									<div
										className={classNames(style.iconWrapper, "only-desctop")}
									>
										<div className={style.icon}>
											<NewsArrowIcon />
										</div>
										<div className={style.iconHover}>
											<NewsArrowIconHover />
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
					<div className="news-btn-wrapper only-desctop">
						<Button variant="secondary" href="/infocentre/news">
							{btnCaptions.all_news}
						</Button>
					</div>
					<Button
						variant="secondary"
						className="only-mobile"
						href="/infocentre/news"
					>
						{btnCaptions.all_news}
					</Button>
				</div>
			</div>
		</section>
	);
};

export default News;
