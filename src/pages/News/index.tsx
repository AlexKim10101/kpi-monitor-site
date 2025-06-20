import React from "react";
import style from "./newPage.module.css";
import classNames from "classnames";
import { useAllNews } from "@api/model";
import Loader from "@components/Loader";

import AllNewsSection from "../../widgets/sections/allnews";
import Button from "@components/CustomButton";

type INewsPageProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const NewsPage: React.FC<INewsPageProps> = ({ btnCaptions }) => {
	const { data, isLoading, error } = useAllNews();

	if (isLoading) {
		return <Loader />;
	}

	if (error || !data) return <p>Ошибка загрузки данных</p>;

	return (
		<div className={style.newsPageWrapper}>
			<section className={classNames("section", style.headingSection)}>
				<div className="section-title">Новости и мероприятия</div>
				<div className={style.newsSectionDescription}>
					Одна из главных ценностей нашей компании — идти в ногу со временем.
					Мы верим, что только так IT-продукт может оставаться полезным
					и эффективным.В этом разделе собраны последние новости о KPI MONITOR и
					команде ПрофИтПроект, а также о достижениях наших клиентов, связанных
					с нашими разработками.
				</div>
			</section>
			<AllNewsSection news={data} btnCaptions={btnCaptions} />

			<section className={classNames("section", style.btnCenter)}>
				<Button variant="accent">{btnCaptions.details}</Button>
			</section>
		</div>
	);
};

export default NewsPage;
