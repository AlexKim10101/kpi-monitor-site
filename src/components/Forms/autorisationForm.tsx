import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@components/CustomButton";
import { getTextFieldSx } from "./utils/getTextFieldSx";
import style from "./form.module.css";
import { FormInput } from "./FormInput";

type FormData = {
	login: string;
	password: string;
};

const AutorisationForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const onSubmit = (data: FormData) => {
		console.log("Форма отправлена:", data);
	};

	const values = watch();

	return (
		<div className={style.formContainer}>
			<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					control={control}
					name="login"
					label="Логин"
					error={errors.login}
					rules={{ required: "Введите логин" }}
					value={values.login}
				/>

				<FormInput
					control={control}
					name="password"
					label="Пароль"
					error={errors.password}
					rules={{
						required: "Пароль",
						pattern: {
							value: /^\+?\d{10,15}$/,
							message: "некорректный пароль",
						},
					}}
					value={values.password}
				/>

				<div className={style.formLink}>
					<span>Еще нет аккаунта?</span>
					<Link to="/auth/registration" className={style.link}>
						Зарегистрироваться
					</Link>
				</div>

				<Button type="submit" variant="accent" className={style.submitBtn}>
					Войти
				</Button>
			</form>
		</div>
	);
};

export default AutorisationForm;
