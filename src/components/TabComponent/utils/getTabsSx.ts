export const getTabsSx = () => ({
	"& .MuiTabs-list": {
		justifyContent: "flex-start",
		overflowX: "auto",
		paddingBottom: "12px",
		gap: "30px",
	},

	"& .MuiTabs-indicator": {
		height: "2px",
		bottom: "12px",
		display: "none",
	},

	"& .MuiTab-root": {
		color: "#AABEFA",
		fontFamily: "Ubuntu",
		fontSize: "14px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "normal",
		flexShrink: 0,
		padding: "10px",
		"&:hover": {
			color: "var(--primary-color)",
		},
		"&.Mui-selected": {
			color: "var(--primary-color)",
			fontWeight: "700",
			borderBottom: "1px solid var(--primary-color)",
		},
	},

	"@media (min-width: 1025px)": {
		"& .MuiTab-root": {
			fontSize: "16px",
			flexGrow: 1,

			// width: "47%",
			maxWidth: "none",

			"&.Mui-selected": {
				borderBottom: "1px solid transparent",
			},
		},

		"& .MuiTabs-list": {
			justifyContent: "space-between",
			paddingBottom: "0px",
		},

		"& .MuiTabs-indicator": {
			height: "1px",
			bottom: "0px",
			display: "block",
		},
	},
});
