import React from "react";
import classNames from "classnames";
import styles from "./customButton.module.css";

// const styles = require("./customButton.module.css");

type ButtonProps = {
	variant?: "primary" | "secondary" | "accent";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	href?: string;
	children: React.ReactNode;
	onClick?: (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => void;
	className?: string;
};

const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "medium",
	disabled = false,
	href,
	children,
	onClick,
	className: externalClassName = "",
}) => {
	const className = classNames(
		styles.custombtn,
		variant === "primary" && styles.btnprimary,
		variant === "secondary" && styles.btnsecondary,
		variant === "accent" && styles.btnaccent,
		externalClassName
	);

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
