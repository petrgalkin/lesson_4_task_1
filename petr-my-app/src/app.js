import * as yup from "yup";
import { useState, useRef } from "react";
import styles from "./app.module.css";

const emailChangeScheme = yup
	.string()
	.matches(
		/^[\w_@.]*$/,
		"Неверный E-mail. Допустимые символы - буквы, цифры, нижнее подчеркивание, @ и точка."
	)
	.max(20, "Неверный E-mail. Должно быть не более 20 символов.");

const passwordChangeScheme = yup
	.string()
	.matches(
		/^[\w_]*$/,
		"Неверный пароль. Доступные символы - буквы, цифры и нижнее подчеркивание."
	)
	.max(15, "Неверный пароль. Должно быть не более 15 символов.");

const passwordBlurScheme = yup
	.string()
	.min(3, "Неверный пароль. Пароль должен быть не меньше 3-х символов.");

const confirmPasswordChangeScheme = yup
	.string()
	.matches(
		/^[\w_]*$/,
		"Неверный пароль. Доступные символы - буквы, цифры и нижнее подчеркивание."
	)
	.max(15, "Неверный пароль. Должно быть не более 15 символов.");

const confirmPasswordBlurScheme = yup
	.string()
	.min(3, "Неверный пароль. Пароль должен быть не меньше 3-х символов.");

const validateAndGetErrorMassage = (scheme, value) => {
	let errorMassage = null;

	try {
		scheme.validateSync(value);
	} catch ({ errors }) {
		errorMassage = errors[0];
	}

	return errorMassage;
};

export const App = () => {
	const defaultValue = "";
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		const error = validateAndGetErrorMassage(
			emailChangeScheme,
			target.value
		);

		setEmailError(error);

		if (target.value.length === 20) {
			submitButtonRef.current.focus();
		}
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		const error = validateAndGetErrorMassage(
			passwordChangeScheme,
			target.value
		);

		setPasswordError(error);
	};

	const onPasswordBlur = () => {
		const error = validateAndGetErrorMassage(passwordBlurScheme, password);

		setPasswordError(error);
	};

	const onPasswordFocus = () => {
		if (password === confirmPassword) {
			setConfirmPasswordError(null);
		} else {
			setConfirmPasswordError("Пароли не совпадают.");
		}
	};

	const onConfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);

		let error = null;
		if (!/^[\w_]*$/.test(target.value)) {
			error =
				"Неверный пароль. Доступные символы - буквы, цифры и нижнее подчеркивание.";
		} else if (target.value.length > 15) {
			error = "Неверный пароль. Должно быть не более 15 символов.";
		}
		setConfirmPasswordError(error);
	};

	const onConfirmPasswordBlur = () => {
		if (confirmPassword.length < 3) {
			setConfirmPasswordError(
				"Неверный пароль. Пароль должен быть не меньше 3-х символов."
			);
		}
		if (password !== confirmPassword) {
			setConfirmPasswordError("Пароли не совпадают.");
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(
			"E-mail:",
			email,
			"\nПароль:",
			password,
			"\nПовтор пароля:",
			confirmPassword
		);
		setEmail(defaultValue);
		setPassword(defaultValue);
		setConfirmPassword(defaultValue);
	};

	const onFocusSubmit = () => {
		if (password !== confirmPassword) {
			setPasswordError("Пароли не совпадают.");
			setConfirmPasswordError("Пароли не совпадают.");
		}
	};

	return (
		<div className={styles.App}>
			<p className={styles.formTitle}>Форма регистрации</p>
			<form className={styles.shape} onSubmit={onSubmit}>
				{emailError && (
					<div className={styles.errorLabel}>{emailError}</div>
				)}
				<input
					type="email"
					name="email"
					placeholder="Введите E-mail"
					value={email}
					onChange={onEmailChange}
				/>

				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}

				<input
					type="password"
					name="password"
					placeholder="Придумайте пароль"
					value={password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
					onFocus={onPasswordFocus}
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
					value={confirmPassword}
					onChange={onConfirmPasswordChange}
					onBlur={onConfirmPasswordBlur}
				/>

				<button
					ref={submitButtonRef}
					type="submit"
					className={styles.formButton}
					disabled={
						email === "" ||
						emailError !== null ||
						passwordError !== null ||
						confirmPasswordError !== null
					}
					onFocus={onFocusSubmit}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
