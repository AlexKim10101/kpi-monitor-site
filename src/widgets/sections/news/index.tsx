import React from "react";
import { useQuery } from "@tanstack/react-query";
import { urls } from "../../../consts/consts";
import { INewData } from "../../../types";
import formatDateToDDMMYYYY from "../../../utils/dateformatter";
import Icon from "@components/icon";
import "./news.css";
import Button from "@components/CustomButton";

type INewsProps = {};

const News: React.FC<INewsProps> = () => {
	const newsQuery = useQuery({
		queryKey: ["news"],
		queryFn: () => fetch(urls.news).then(res => res.json()),
	});

	const newsData: INewData[] =
		newsQuery && newsQuery.data ? newsQuery.data.data : [];

	return (
		<section className="news-section">
			<div className="news-wrapper">
				<div className="news-section-title">Новости и мероприятия</div>
				<div className="news-section-content">
					<div className="news-list">
						{newsData.map(n => (
							<div className="news-list-item">
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
