import React from "react";
import { useQuery } from "@tanstack/react-query";

import Icon from "../components/icon";
import Button from "../components/CustomButton";
import ClientsSection from "../widgets/sections/clients";
import SolutionsSection from "../widgets/sections/solutions";

import { urls } from "../consts/consts";
import KeyFunctions from "../widgets/sections/keyfunctions";
import Stages from "../widgets/sections/stages";
import News from "../widgets/sections/news";
import CoatOfArmsIcon from "@assets/icons/Coat_of_Arms.svg";

type IHomPageProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const HomePage: React.FC<IHomPageProps> = ({ captions, btnCaptions }) => {
	return (
		<>
			<section className="intro-section">
				<div className="intro-info">
					<div className="intro-title">{captions.heading_main}</div>
					<div className="intro-message">
						{/* <Icon
							id="coat_of_arm"
							path="/icons/Coat_of_Arms_of_the_Russian_Federation.svg"
							size={44}
						></Icon> */}
						<CoatOfArmsIcon />
						<div className="message-text">{captions.russian_registry}</div>
					</div>
					<div className="intro-bts">
						<Button variant="primary">{btnCaptions.quick_start}</Button>
						<Button variant="secondary">{btnCaptions.contact_us}</Button>
					</div>
				</div>
				<div>
					<img
						height={400}
						width={656}
						src="/images/img_intro.png"
						alt="img-intro"
					/>
				</div>
			</section>
			<ClientsSection captions={captions} />
			<SolutionsSection captions={captions} btnCaptions={btnCaptions} />
			<KeyFunctions captions={captions} btnCaptions={btnCaptions} />
			<Stages captions={captions} btnCaptions={btnCaptions} />
			<News captions={captions} btnCaptions={btnCaptions} />
		</>
	);
};

export default HomePage;
