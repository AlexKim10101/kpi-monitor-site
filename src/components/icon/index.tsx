import React from "react";

interface IconProps {
	id: string;
	path: string;
	size?: number;
}

const Icon: React.FC<IconProps> = ({ id, path, size = 24 }) => {
	return (
		<img
			src={`${path}`}
			alt={`icon-${id}`}
			width={size}
			height={size}
			style={{ display: "block" }}
		/>
	);
};

export default Icon;
