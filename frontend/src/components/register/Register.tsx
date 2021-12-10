import { useMutateRegisterUser } from "gql/hooks/user-query";
import { useCallback, useState } from "react";
import { handleFormBlur } from "../../hooks/state";
import cs from "./Register.module.scss";

const Register = () => {
	const [newUser, setNewUser] = useState<NewUser>({} as NewUser);
	const { data, mutate: mutateRegisterUser } = useMutateRegisterUser();

	const handleSubmit = useCallback(
		(newUser: NewUser) => {
			if (newUser && newUser.username && newUser.password) {
				mutateRegisterUser(newUser);
			}
		},
		[newUser]
	);

	return (
		<div className="Register">
			{!data?.user && (
				<>
					<form className={cs.Form}>
						<h2 className={cs.Title}>Register a new account</h2>
						<label className={cs.Label} htmlFor="username">
							Username
						</label>

						<input
							className={cs.Input}
							onBlur={(e) => handleFormBlur(e, newUser, setNewUser)}
							type="text"
							name="username"
						/>

						<label className={cs.Label} htmlFor="password">
							Password
						</label>

						<input
							className={cs.Input}
							onBlur={(e) => handleFormBlur(e, newUser, setNewUser)}
							type="password"
							name="password"
						/>

						<input
							onClick={() => handleSubmit(newUser)}
							className={cs.Button}
							type="button"
							value="Register"
						/>

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
