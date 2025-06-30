export const getTintSx = () => ({
	background: "rgba(158, 177, 232, 0.25)",
	backdropFilter: "blur(5px)",

	"& .MuiModal-backdrop": {
		backgroundColor: "transparent",
	},
});

export const getModalSx = () => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	boxShadow: 24,
	borderRadius: "20px",
});
