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

const ContactUsForm = () => {
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
			<div className={style.formTitle}>Мы на связи и готовы помочь!</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classNames(style.form, style.contactForm)}
			>
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
					name="company"
					label="Название компании"
					value={values.company}
					error={errors.company}
				/>

				<Button type="submit" variant="accent" className={style.submitBtn}>
					Заказать звонок
				</Button>
			</form>
		</div>
	);
};

export default ContactUsForm;
