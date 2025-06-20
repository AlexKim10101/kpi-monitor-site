import React from "react";
import { Link } from "react-router";
import classNames from "classnames";
import styles from "./customButton.module.css";

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

	if (href) {
		return (
			<Link
				to={disabled ? "" : href}
				className={className}
				onClick={e => {
					if (disabled) {
						e.preventDefault();
						return;
					}
					onClick?.(e);
				}}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
			>
				{children}
			</Link>
		);
	}

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
