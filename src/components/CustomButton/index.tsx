import React from "react";
import styled from "@emotion/styled";
import {
	ACCENT_COLOR,
	PRIMARY_COLOR,
	SECONDARY_COLOR,
	WHITE_COLOR,
	PRIMARY_HOVER_COLOR,
	BLACK_COLOR,
} from "../../consts/consts";

type ButtonProps = {
	variant?: "primary" | "secondary" | "accent";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	href?: string;
	children: React.ReactNode;
	onClick?: (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => void;
};

const variantStyles = {
	primary: {
		background: PRIMARY_COLOR,
		color: WHITE_COLOR,
		hover: PRIMARY_HOVER_COLOR,
		active: "#AABEFA",
	},
	secondary: {
		background: SECONDARY_COLOR,
		color: PRIMARY_COLOR,
		hover: SECONDARY_COLOR,
		active: PRIMARY_COLOR,
	},
	accent: {
		background: ACCENT_COLOR,
		color: BLACK_COLOR,
		hover: ACCENT_COLOR,
		active: PRIMARY_COLOR,
	},
};

const sizeStyles = {
	small: {
		padding: "4px 10px",
		fontSize: "12px",
	},
	medium: {
		padding: "10px 30px",
		fontSize: "16px",
	},
	large: {
		padding: "12px 20px",
		fontSize: "16px",
	},
};

const StyledButton = styled.button<
	Required<Pick<ButtonProps, "variant" | "size">>
>`
	display: inline-block;
	border: none;
	border-radius: 30px;
	cursor: pointer;
	font-weight: 500;
	padding: ${({ size }) => sizeStyles[size].padding};
	font-family: "Ubuntu";
	font-weight: 400;
	font-size: ${({ size }) => sizeStyles[size].fontSize};
	background-color: ${({ variant }) => variantStyles[variant].background};
	color: ${({ variant }) => variantStyles[variant].color};
	text-decoration: none;
	white-space: nowrap;
	border: 1px solid white;

	&:hover {
		background-color: ${({ variant }) => variantStyles[variant].hover};
		border: 1px solid var(--Accent, #22409a);
	}

	&:active {
		color: ${({ variant }) => variantStyles[variant].active};
		background-color: ${({ variant }) => variantStyles[variant].background};
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

const StyledLink = StyledButton.withComponent("a");

const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "medium",
	disabled = false,
	href,
	children,
	onClick,
}) => {
	if (href) {
		return (
			<StyledLink
				variant={variant}
				size={size}
				href={disabled ? undefined : href}
				onClick={disabled ? e => e.preventDefault() : onClick}
				aria-disabled={disabled}
			>
				{children}
			</StyledLink>
		);
	}

	return (
		<StyledButton
			variant={variant}
			size={size}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
