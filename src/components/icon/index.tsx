import { css } from "@emotion/react";
import React from "react";

interface IconProps {
	id: string;
	path: string;
	size?: number;
	width?: number;
	height?: number;
	needAdaptive?: boolean;
}

const imgCss = ({
	width: propsWidth,
	height: propsHeight,
	size = 24,
	needAdaptive = false,
}: Omit<IconProps, "path" | "id">) => {
	const width = propsWidth ?? size;
	const height = propsHeight ?? size;

	return css`
		width: ${needAdaptive ? (width * 2) / 3 : width}px;
		height: ${needAdaptive ? (height * 2) / 3 : height}px;

		@media (min-width: 1025px) {
			width: ${width}px;
			height: ${height}px;
		}
	`;
};

const Icon: React.FC<IconProps> = props => {
	const { id, path } = props;

	return (
		<img
			src={`${path}`}
			alt={`icon-${id}`}
			style={{ display: "block" }}
			css={imgCss(props)}
		/>
	);
};

export default Icon;
