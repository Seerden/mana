import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as S from "./LoginForm.style";

const LoginForm = ({
	authError,
	user,
	setUser,
	showPass,
	setShowPass,
	message,
	handleFormBlur,
	handleLogin,
}) => {
	return (
		<div className="PageWrapper">
			<main>
				<S.Header>
					You need to be logged in to view this page. Please log in or register.
				</S.Header>

				{message && <S.Message>{message}</S.Message>}

				{authError?.response?.status === 401 && (
					<S.Error>Incorrect credentials. Try again.</S.Error>
				)}

				<S.Form>
					<header className="PageHeader">Log in</header>

					<S.FormField>
						<S.InputLabel htmlFor="username">Username</S.InputLabel>

						<S.FormFieldContent>
							<S.Input
								onBlur={(e) => handleFormBlur(e, user, setUser)}
								required
								autoComplete="username"
								type="text"
								name="username"
							/>
						</S.FormFieldContent>
					</S.FormField>

					<S.FormField>
						<S.InputLabel htmlFor="password">Password</S.InputLabel>

						<S.FormFieldContent>
							<S.Input
								required
								onBlur={(e) => handleFormBlur(e, user, setUser)}
								autoComplete="password"
								type={showPass ? "text" : "password"}
								name="password"
							/>
							<S.ShowPassword
								showPassword={showPass}
								onClick={() => setShowPass((showPass) => !showPass)}
							>
								{showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
							</S.ShowPassword>
						</S.FormFieldContent>
					</S.FormField>

					<S.Buttons>
						<S.LoginButton type="button" onClick={handleLogin} value="Log in" />

						<S.RegisterLink to="/register">Register</S.RegisterLink>
					</S.Buttons>
				</S.Form>
			</main>
		</div>
	);
};

export default LoginForm;
