import { useForm } from "react-hook-form";
import { Link } from "react-router";
import classNames from "classnames";
import { FormInput } from "./FormInput";
import Button from "@components/CustomButton";
import style from "./form.module.css";

type FormData = {
	fullName: string;
	phone: string;
	email: string;
	company: string;
};

type RegistrationFormProps = {
	captions: Record<string, string>;
	btnCaptions: Record<string, string>;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ btnCaptions }) => {
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
			<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
				<FormInput
					control={control}
					name="fullName"
					label="ФИО"
					error={errors.fullName}
					rules={{ required: "Введите ФИО" }}
					value={values.fullName}
				/>

				<FormInput
					control={control}
					name="phone"
					label="Телефон"
					value={values.phone}
					error={errors.phone}
					rules={{
						required: "Введите телефон",
						pattern: {
							value: /^\+?\d{10,15}$/,
							message: "Неверный формат телефона",
						},
					}}
				/>

				<FormInput
					control={control}
					name="email"
					label="Email"
					value={values.email}
					error={errors.email}
					rules={{
						required: "Введите email",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Неверный email",
						},
					}}
				/>

				<FormInput
					control={control}
					name="company"
					label="Название компании"
					value={values.company}
					error={errors.company}
				/>

				<div className={style.formLink}>
					<span>Уже зарегистрированы?</span>
					<Link to="/auth/authorization" className={style.link}>
						{btnCaptions.entry}
					</Link>
				</div>

				<Button type="submit" variant="accent" className={style.submitBtn}>
					{btnCaptions.register}
				</Button>
			</form>
		</div>
	);
};

export default RegistrationForm;
