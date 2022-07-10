import * as S from "./Register.style";
import { useRegister } from "./useRegister";

const Register = () => {
	const { user, handleChange, handleSubmit, message } = useRegister();

	return (
		<div className="Register">
			{!user && (
				<>
					<S.Form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<S.Title>Register a new account</S.Title>
						{message && <S.Message>{message}</S.Message>}
						<S.Label htmlFor="username">Username</S.Label>

						<S.Input onChange={handleChange} type="text" name="username" />

						<S.Label htmlFor="password">Password</S.Label>
						<S.Input onChange={handleChange} type="password" name="password" />

						<S.Label htmlFor="repeatPassword">Repeat password</S.Label>
						<S.Input
							onChange={handleChange}
							type="password"
							name="repeatPassword"
						/>

						<S.Button type="submit" value="Register" />

						<S.Paragraph>
							Already have an account?{" "}
							<S.RegisterLink to="/login">Sign in here</S.RegisterLink>
						</S.Paragraph>
					</S.Form>
				</>
			)}
		</div>
	);
};

export default Register;
