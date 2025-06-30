import React from "react";

import classNames from "classnames";
import { getImageUrl } from "../../utils/getImageUrl";
import { DescriptionElement, InterfaceDataItem } from "../../types/interfaces";
import style from "./Interafces.module.css";
import { fakeCardsDescription } from "@consts/consts";
import Icon from "@components/icon";
import CardGallery from "@components/Slider";

export const renderDescription = (
	description: DescriptionElement[]
): React.ReactNode => {
	return description.map((element, index) => {
		if (element.type === "paragraph") {
			return (
				<p key={index}>
					{element.children.map((node, i) => (
						<React.Fragment key={i}>{node.text}</React.Fragment>
					))}
				</p>
			);
		}

		if (element.type === "list") {
			return (
				<ul key={index}>
					{element.children.map((item, i) => (
						<li key={i}>
							{item.children.map((node, j) => (
								<React.Fragment key={j}>{node.text}</React.Fragment>
							))}
						</li>
					))}
				</ul>
			);
		}

		return null;
	});
};
export const getDinamiContent = (data: InterfaceDataItem) => {
	switch (data.type_content) {
		case "picture": {
			return (
				<div key={data.id} className={style.pictureBlock}>
					<div className={style.infoBlock}>
						<div className={style.subtitle}>{data.title}</div>
						<div className={style.description}>{data.description}</div>
					</div>
					{data.content.map(item => (
						<div key={item.id} className={style.pictureContainer}>
							<img
								src={getImageUrl(item.picture.url)}
								alt={item.picture.name}
							/>
						</div>
					))}
				</div>
			);
		}

		case "cards": {
			return (
				<div key={data.id} className={style.cardsBlock}>
					<div className={style.infoBlock}>
						<div className={style.subtitle}>{data.title}</div>
						<div className={style.description}>{fakeCardsDescription}</div>
					</div>
					<div className={style.cardsContainer}>
						{data.content.map(card => (
							<div key={card.id} className={style.card}>
								<div className={style.cardTitle}>
									<Icon
										id="pin"
										path={getImageUrl("uploads/ic_96308b0669.png")}
										size={18}
									/>
									{card.title}
								</div>
								<div className={style.cardDescription}>{card.description}</div>
								<div className={style.image}>
									<img
										src={getImageUrl(card.picture.url)}
										alt={card.picture.name}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			);
		}
		case "gallery": {
			const isOneSlide = data.content.length === 1;

			return (
				<div key={data.id} className={style.galleryBlock}>
					<div className={style.infoBlock}>
						<div className={style.subtitle}>{data.title}</div>
					</div>

					{isOneSlide && (
						<div className={style.slide}>
							<div className={style.slideImg}>
								<img
									src={getImageUrl(data.content[0].picture.url)}
									alt={data.content[0].picture.name}
								/>
							</div>
							<div
								className={classNames(
									style.description,
									style.slideDescription,
									{
										[style.firstSlideDescription]:
											!data.content[0].picture_first,
									}
								)}
							>
								{data.content[0].title && (
									<div className={style.descriptionTitle}>
										{data.content[0].title}
									</div>
								)}
								<div className={style.descriptionContent}>
									{renderDescription(data.content[0].description)}
								</div>
							</div>
						</div>
					)}

					{!isOneSlide && (
						<CardGallery
							desctopSlidesToShow={1}
							laptopSlidesToShow={1}
							mobileSlidesToShow={1}
							slidesToScroll={1}
							showCounter
							showDots={true}
						>
							{data.content.map(slide => (
								<div>
									<div className={style.slide}>
										<div className={style.slideImg}>
											<img
												src={getImageUrl(slide.picture.url)}
												alt={slide.picture.name}
											/>
										</div>
										<div
											className={classNames(
												style.description,
												style.slideDescription,
												{
													[style.firstSlideDescription]: !slide.picture_first,
												}
											)}
										>
											{slide.title && (
												<div className={style.descriptionTitle}>
													{slide.title}
												</div>
											)}

											<div className={style.descriptionContent}>
												{renderDescription(slide.description)}
											</div>
										</div>
									</div>
								</div>
							))}
						</CardGallery>
					)}
				</div>
			);
		}
		default:
			return null;
	}
};
