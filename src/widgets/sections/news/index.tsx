import React from "react";
import Button from "@components/CustomButton";
import Icon from "@components/icon";
import { useNews } from "../../../api/model";
import formatDateToDDMMYYYY from "../../../utils/dateformatter";
import "./news.css";

type INewsProps = {};

const News: React.FC<INewsProps> = () => {
	const { data, isLoading, error } = useNews();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="news-section">
			<div className="news-wrapper">
				<div className="news-section-title">Новости и мероприятия</div>
				<div className="news-section-content">
					<div className="news-list">
						{data.map((n, i) => (
							<div key={n.id} className="news-list-item">
								<div className="news-item-date">
									{formatDateToDDMMYYYY(n.date)}
								</div>
								<div className="news-item-title">{n.title}</div>
								<div className="icon-wrapper">
									<Icon
										path="/icons/news_arrow.svg"
										id={String(n.id)}
										width={40}
										height={54}
									/>
								</div>
							</div>
						))}
					</div>
					<div className="news-btn-wrapper">
						<Button variant="secondary">Все новости</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default News;
