import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type LoaderProps = {};

const Loader: React.FC<LoaderProps> = () => {
	return (
		<div
			style={{
				flexGrow: 1,
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress disableShrink sx={{ color: "#22409a" }} />
		</div>
	);
};

export default Loader;
