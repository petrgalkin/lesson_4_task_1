import { useForm } from "react-hook-form";
import { useRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./app.module.css";

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.email("Некорректный email")
		.matches(
			/^[\w_@.]*$/,
			"Неверный E-mail. Допустимые символы - буквы, цифры, нижнее подчеркивание, @ и точка."
		)
		.max(20, "Неверный E-mail. Должно быть не более 20 символов.")
		.required("Email обязателен для заполнения"),
	password: yup
		.string()
		.min(3, "Неверный пароль. Пароль должен быть не меньше 3-х символов.")
		.max(15, "Неверный пароль. Должно быть не более 15 символов.")
		.required("Пароль обязателен для заполнения"),
	confirmPassword: yup
		.string()
		.min(3, "Неверный пароль. Пароль должен быть не меньше 3-х символов.")
		.max(15, "Неверный пароль. Должно быть не более 15 символов.")
		.oneOf([yup.ref("password"), null], "Пароли не совпадают")
		.required("Подтверждение пароля обязателно для заполнения"),
});

export const App = () => {
	const registerButtonElement = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setFocus,
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: yupResolver(fieldsScheme),
		mode: "onBlur",
	});

	const emailError = errors.email?.message;

	const passwordError = errors.password?.message;

	const confirmPasswordError = errors.confirmPassword?.message;

	const onSubmit = (formData) => {
		if (isValid) {
			registerButtonElement.current.focus();
		}

		console.log(formData);
	};

	return (
		<div className={styles.App}>
			<p className={styles.formTitle}>Форма регистрации</p>
			<form className={styles.shape} onSubmit={handleSubmit(onSubmit)}>
				{emailError && (
					<div className={styles.errorLabel}>{emailError}</div>
				)}

				<input
					type="email"
					name="email"
					placeholder="Введите E-mail"
					{...register("email")}
					onFocus={() => setFocus("email")}
				/>

				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}

				<input
					type="password"
					name="password"
					placeholder="Придумайте пароль"
					{...register("password")}
					onFocus={() => setFocus("password")}
				/>

				{confirmPasswordError && (
					<div className={styles.errorLabel}>
						{confirmPasswordError}
					</div>
				)}

				<input
					type="password"
					name="confirmPassword"
					placeholder="Повторите пароль"
					{...register("confirmPassword")}
					onFocus={() => setFocus("confirmPassword")}
				/>

				<button
					ref={registerButtonElement}
					type="submit"
					className={styles.formButton}
					disabled={!isValid}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
