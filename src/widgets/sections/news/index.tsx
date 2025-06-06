import React from "react";
import Button from "@components/CustomButton";
import { useNews } from "@api/model";
import formatDateToDDMMYYYY from "../../../utils/dateformatter";
import NewsArrowIcon from "@assets/icons/news_arrow.svg";
import NewsArrowIconHover from "@assets/icons/news_arrow_hover.svg";

import "./news.css";

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
		<section className="news-section">
			<div className="news-wrapper">
				<div className="news-section-title">{captions.heading_news}</div>
				<div className="news-section-content">
					<div className="news-list">
						{data.map((n, i) => (
							<div key={n.id} className="news-list-item">
								<div className="news-item-date">
									{n.date ? formatDateToDDMMYYYY(n.date) : ""}
								</div>
								<div className="news-item-title">{n.title}</div>
								<div className="icon-wrapper">
									<div className="icon">
										<NewsArrowIcon />
									</div>
									<div className="icon-hover">
										<NewsArrowIconHover />
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="news-btn-wrapper">
						<Button variant="secondary">{btnCaptions.all_news}</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default News;
