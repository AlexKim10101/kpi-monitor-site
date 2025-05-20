import React from "react";

interface IconProps {
	id: string;
	path: string;
	size?: number;
	width?: number;
	height?: number;
}

const Icon: React.FC<IconProps> = ({ id, path, size = 24, width, height }) => {
	return (
		<img
			src={`${path}`}
			alt={`icon-${id}`}
			width={width ?? size}
			height={height ?? size}
			style={{ display: "block" }}
		/>
	);
};

export default Icon;
