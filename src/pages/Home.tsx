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

type IHomPageProps = {};

const HomePage: React.FC<IHomPageProps> = () => {
	return (
		<>
			<section className="intro-section">
				<div className="intro-info">
					<div className="intro-title">
						Готовое решение для оценки эффективности работы компании
					</div>
					<div className="intro-message">
						<Icon
							id="coat_of_arm"
							path="/icons/Coat_of_Arms_of_the_Russian_Federation.svg"
							size={44}
						></Icon>
						<div className="message-text">
							Входим в реестр отечественного программного обеспечения.
						</div>
					</div>
					<div className="intro-bts">
						<Button variant="accent">Быстрый старт</Button>
						<Button variant="secondary">Связаться с нами</Button>
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
			<ClientsSection />
			<SolutionsSection />
			<KeyFunctions />
			<Stages />
			<News />
		</>
	);
};

export default HomePage;
