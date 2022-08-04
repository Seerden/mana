import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { UserInput } from "../../../gql/codegen-output";
import * as S from "./LoginForm.style";

type LoginFormProps = {
	authError: any;
	user: UserInput;
	setUser: React.Dispatch<React.SetStateAction<UserInput>>;
	showPass: boolean;
	setShowPass: React.Dispatch<React.SetStateAction<boolean>>;
	message: any;
	handleFormBlur: (...args: any) => void;
	handleLogin: (args?: any) => void;
};

const LoginForm = ({
	authError,
	user,
	setUser,
	showPass,
	setShowPass,
	message,
	handleFormBlur,
	handleLogin,
}: LoginFormProps) => {
	return (
		<div className="PageWrapper">
			<main>
				<S.Message type="header">
					You need to be logged in to view this page. Please log in or register.
				</S.Message>

				{message && <S.Message type="message">{message}</S.Message>}

				{authError?.response?.status === 401 && (
					<S.Message type="error">Incorrect credentials. Try again.</S.Message>
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
								inputType="text"
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
								inputType="password"
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
