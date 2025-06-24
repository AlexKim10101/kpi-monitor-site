import React from "react";
import Button from "@components/CustomButton";
import CoatOfArmsIcon from "@assets/icons/Coat_of_Arms.svg";
import CoatOfArmsMobIcon from "@assets/icons/Coat_of_Arms_mob.svg";

import classNames from "classnames";
import style from "./intro.module.css";

type IntroSectionProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const IntroSection: React.FC<IntroSectionProps> = ({
	captions,
	btnCaptions,
}) => {
	return (
		<section className={classNames("section", style.introSection)}>
			<div className={style.introInfo}>
				<div className="section-title">{captions.heading_main}</div>
				<div className={style.introMessage}>
					<div className={style.iconWrapper}>
						<CoatOfArmsIcon />
					</div>
					<div className={style.iconWrapperMob}>
						<CoatOfArmsMobIcon />
					</div>
					<div className={style.messageText}>{captions.russian_registry}</div>
				</div>
				<div className={style.introBts}>
					<Button variant="accent" href="/auth/registration">
						{btnCaptions.quick_start}
					</Button>
					<Button variant="secondary" href="/infocentre/contacts">
						{btnCaptions.contact_us}
					</Button>
				</div>
			</div>
			<div className={style.introImageContainer}>
				<img
					className={style.introImage}
					src="/images/img_intro.png"
					alt="img-intro"
				/>
			</div>
		</section>
	);
};

export default IntroSection;
