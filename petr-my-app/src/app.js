import { useState, useRef } from "react";
import styles from "./app.module.css";

export const App = () => {
	const defaultValue = "";
	const [email, setEmail] = useState(defaultValue);
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState(defaultValue);
	const [passwordError, setPasswordError] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(defaultValue);
	const [confirmPasswordError, setConfirmPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		let error = null;

		if (!/^[\w_@.]*$/.test(target.value)) {
			error =
				"Неверный E-mail. Допустимые символы - буквы, цифры, нижнее подчеркивание, @ и точка.";
		} else if (target.value.length > 20) {
			error = "Неверный E-mail. Должно быть не более 20 символов.";
		}
		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let error = null;
		if (!/^[\w_]*$/.test(target.value)) {
			error =
				"Неверный пароль. Доступные символы - буквы, цифры и нижнее подчеркивание.";
		} else if (target.value.length > 15) {
			error = "Неверный пароль. Должно быть не более 15 символов.";
		}
		setPasswordError(error);
	};

	const onPasswordBlur = () => {
		if (password.length < 3) {
			setPasswordError(
				"Неверный пароль. Пароль должен быть не меньше 3-х символов."
			);
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
			setPasswordError("Пароли не совпадают.");
			setConfirmPasswordError("Пароли не совпадают.");
		} else {
			submitButtonRef.current.focus();
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
						password === "" ||
						confirmPassword === "" ||
						emailError !== null ||
						passwordError !== null ||
						confirmPasswordError !== null ||
						password !== confirmPassword
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
