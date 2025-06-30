import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import classNames from "classnames";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import BackIcon from "@assets/icons/left-arrow.svg";
import BackIconHover from "@assets/icons/left-arrow-hover.svg";

import ForwardIcon from "@assets/icons/right-arrow.svg";
import ForwardIconHover from "@assets/icons/right-arrow-hover.svg";

// import { ReactComponent as BackIcon } from "@assets/icons/back-icon.svg";

import "./slider.css";

type ICardGallery = {
	children: any;
	mobileSlidesToShow: number;
	laptopSlidesToShow: number;
	desctopSlidesToShow: number;
	slidesToScroll?: number;
	showCounter?: boolean;
	showDots?: boolean;
	extraWidth?: boolean;
};

const CardGallery: React.FC<ICardGallery> = ({
	children,
	mobileSlidesToShow,
	laptopSlidesToShow,
	desctopSlidesToShow,
	slidesToScroll = 3,
	showCounter = false,
	showDots = false,
	extraWidth = false,
}) => {
	const sliderRef = useRef<Slider | null>(null);
	const [activeSlide, setActiveSlide] = useState(0);

	const next = () => {
		sliderRef.current?.slickNext();
	};

	const prev = () => {
		sliderRef.current?.slickPrev();
	};

	const settings: Settings = {
		dots: false,
		appendDots: dots => (
			<div
				style={{
					pointerEvents: "none",
				}}
			>
				<ul className="dots-list"> {dots} </ul>
			</div>
		),
		infinite: true,
		speed: 500,
		slidesToShow: desctopSlidesToShow,
		focusOnSelect: false,
		slidesToScroll: slidesToScroll,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: showDots,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: laptopSlidesToShow,
					focusOnSelect: true,
					autoplay: false,
					dots: showDots,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: mobileSlidesToShow,
					focusOnSelect: true,
					autoplay: false,
					dots: showDots,
				},
			},
		],
		autoplay: false,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		beforeChange: (current, next) => {
			setActiveSlide(next);
		},
	};

	return (
		<div className={classNames("slider-container", { extraWidth: extraWidth })}>
			<Slider ref={sliderRef} {...settings}>
				{children}
			</Slider>
			<div
				className={classNames("button-container", {
					buttonContainerWithCounter: showCounter,
				})}
			>
				<div className="arrow-button" onClick={prev}>
					<BackIcon />
					<BackIconHover />
				</div>

				{showCounter && (
					<div className="counter">{`${activeSlide + 1} / ${
						children.length
					}`}</div>
				)}

				<div className="arrow-button" onClick={next}>
					<ForwardIcon />
					<ForwardIconHover />
				</div>
			</div>
		</div>
	);
};

export default CardGallery;
