import React from "react";
import style from "./ScalingBtnWhitnBtn.module.css";
import Button from "@components/CustomButton";

type ScalingImgEithBtnProps = {
	path: string;
	alt: string;
	btnCaption: string;
	onClick?: () => void;
};

const ScalingImgEithBtn: React.FC<ScalingImgEithBtnProps> = ({
	alt,
	path,
	btnCaption,
	onClick,
}) => {
	return (
		<div className={style.container}>
			<img src={path} alt={alt} />
			<div className={style.btnWrap}>
				<Button variant="primary" size="medium" onClick={onClick}>
					{btnCaption}
				</Button>
			</div>
		</div>
	);
};

export default ScalingImgEithBtn;
