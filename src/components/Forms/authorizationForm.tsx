import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import Button from "@components/CustomButton";
import style from "./form.module.css";

type FormData = {
	login: string;
	password: string;
};

type AuthorizationFormProps = {
	onClose?: () => void;
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const AuthorizationForm: React.FC<AuthorizationFormProps> = ({
	onClose,
	btnCaptions,
}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const onSubmit = (data: FormData) => {
		console.log("Форма отправлена:", data);
		onClose && onClose();
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
					<Link
						to="/auth/registration"
						className={style.link}
						onClick={() => {
							onClose && onClose();
						}}
					>
						{btnCaptions.register}
					</Link>
				</div>

				<Button type="submit" variant="accent" className={style.submitBtn}>
					{btnCaptions.entry}
				</Button>
			</form>
		</div>
	);
};

export default AuthorizationForm;
