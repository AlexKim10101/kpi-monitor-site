import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import ForwardIcon from "@assets/icons/slider-arrow.svg";
// import { ReactComponent as BackIcon } from "@assets/icons/back-icon.svg";

import "./slider.css";

type ICardGallery = {
	children: any;
	mobileSlidesToShow: number;
	laptopSlidesToShow: number;
	desctopSlidesToShow: number;
};

const CardGallery: React.FC<ICardGallery> = ({
	children,
	mobileSlidesToShow,
	laptopSlidesToShow,
	desctopSlidesToShow,
}) => {
	const sliderRef = useRef<Slider | null>(null);

	const next = () => {
		sliderRef.current?.slickNext();
	};

	const prev = () => {
		sliderRef.current?.slickPrev();
	};

	const settings: Settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: desctopSlidesToShow,
		focusOnSelect: false,
		slidesToScroll: 3,
		arrows: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: laptopSlidesToShow,
					focusOnSelect: true,
					autoplay: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: mobileSlidesToShow,
					focusOnSelect: true,
					autoplay: false,
				},
			},
		],
		autoplay: false,
		autoplaySpeed: 3000,
		pauseOnHover: true,
	};

	return (
		<div className="slider-container">
			<Slider ref={sliderRef} {...settings}>
				{children}
			</Slider>
			<div className="button-container">
				<div className="arrow-button" onClick={prev}>
					<ForwardIcon />
				</div>

				<div className="arrow-button" onClick={next}>
					<ForwardIcon />
				</div>
				{/* <IconButton onClick={prev} className="icon-button">
					<ForwardIcon />
				</IconButton> */}
				{/* <IconButton onClick={next} className="icon-button">
					<ForwardIcon />
				</IconButton> */}
			</div>
		</div>
	);
};

export default CardGallery;
