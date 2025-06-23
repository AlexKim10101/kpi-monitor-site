import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "@consts/consts";

export const getTextFieldSx = (error: boolean, isFilled: boolean) => ({
	"&.MuiTextField-root": {
		borderRadius: "10px",
		overflow: "hidden",
		border: `1px solid ${error ? "#F57272" : "rgba(158, 177, 232, 0.25)"}`,
	},

	"& .MuiInputLabel-root": {
		color: "#747474",
		fontFamily: "Manrope",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: "normal",
	},

	"& .MuiInputLabel-root.MuiInputLabel-shrink": {
		color: "#747474",
		fontFamily: "Manrope",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: "normal",
	},

	"& .MuiInputLabel-root.Mui-focused": {
		color: PRIMARY_COLOR,
		fontFamily: "Manrope",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: "normal",
	},

	"& .MuiFilledInput-root": {
		color: BLACK_COLOR,
		fontFamily: "Manrope",
		fontSize: "16px",
		fontStyle: "normal",
		fontWeight: 400,
		lineHeight: "normal",
		backgroundColor: `${isFilled ? WHITE_COLOR : "#f8faff"}`,
	},

	"& .MuiFilledInput-root:hover": {
		backgroundColor: `${isFilled ? WHITE_COLOR : "#f8faff"}`,
	},

	"& .MuiFilledInput-root:focus-within": {
		backgroundColor: WHITE_COLOR,
	},

	"& .MuiFilledInput-root::before": {
		display: "none",
	},
	"& .MuiFilledInput-root::after": {
		display: "none",
	},
});
