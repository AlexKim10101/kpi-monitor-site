import { Controller, Control, FieldError } from "react-hook-form";
import { TextField } from "@mui/material";
import { getTextFieldSx } from "./utils/getTextFieldSx";
import style from "./form.module.css";

type FormInputProps = {
	name: string;
	label: string;
	control: Control<any>;
	error?: FieldError;
	value?: string;
	rules?: object;
};

export const FormInput = ({
	name,
	label,
	control,
	error,
	value,
	rules,
}: FormInputProps) => {
	const isFilled = value?.trim() !== "";

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => (
					<TextField
						{...field}
						label={label}
						variant="filled"
						fullWidth
						error={!!error}
						sx={getTextFieldSx(!!error, isFilled)}
					/>
				)}
			/>
			{error && <div className={style.errorMessage}>{error.message}</div>}
		</div>
	);
};
