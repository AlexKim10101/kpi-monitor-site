import React from "react";
import IntroSection from "../widgets/sections/intro";
import ClientsSection from "../widgets/sections/clients";
import SolutionsSection from "../widgets/sections/solutions";
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
			<IntroSection captions={captions} btnCaptions={btnCaptions} />
			<ClientsSection captions={captions} />
			<SolutionsSection captions={captions} btnCaptions={btnCaptions} />
			<KeyFunctions captions={captions} btnCaptions={btnCaptions} />
			<Stages captions={captions} btnCaptions={btnCaptions} />
			<News captions={captions} btnCaptions={btnCaptions} />
		</>
	);
};

export default HomePage;
