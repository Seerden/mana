import cs from "./Register.module.scss";
import { useRegister } from "./useRegister";

const Register = () => {
	const { user, handleChange, handleSubmit, message } = useRegister();

	return (
		<div className="Register">
			{!user && (
				<>
					<form
						className={cs.Form}
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<h2 className={cs.Title}>Register a new account</h2>
						{message && <p className={cs.Message}>{message}</p>}
						<label className={cs.Label} htmlFor="username">
							Username
						</label>

						<input
							className={cs.Input}
							onChange={(e) => handleChange(e)}
							type="text"
							name="username"
						/>

						<label className={cs.Label} htmlFor="password">
							Password
						</label>
						<input
							className={cs.Input}
							onChange={(e) => handleChange(e)}
							type="password"
							name="password"
						/>

						<label className={cs.Label} htmlFor="repeatPassword">
							Repeat password
						</label>
						<input
							className={cs.Input}
							onChange={(e) => handleChange(e)}
							type="password"
							name="repeatPassword"
						/>

						<input className={cs.Button} type="submit" value="Register" />

						<p className={cs.Paragraph}>
							Already have an account?{" "}
							<a className={cs.Link} href="/login">
								Sign in here
							</a>
						</p>
					</form>
				</>
			)}
		</div>
	);
};

export default Register;
