import { useCallback, useState } from "react";
import { handleFormBlur } from "../../hooks/state";
import "./Register.scss";
import { useMutateRegisterUser } from "gql/hooks/user.query";

const Register = (props) => {
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
		<div className="PageWrapper">
			<div className="Register">
				{!data?.user && (
					<>
						<div className="PageHeader">Register a new account</div>
						<form className="Register__form">
							<label htmlFor="username">Username</label>
							<input
								onBlur={(e) => handleFormBlur(e, newUser, setNewUser)}
								type="text"
								name="username"
							/>

							<label htmlFor="password">Password</label>
							<input
								onBlur={(e) => handleFormBlur(e, newUser, setNewUser)}
								type="password"
								name="password"
							/>

							<input
								onClick={() => handleSubmit(newUser)}
								className="Register__button"
								type="button"
								value="Register"
							/>
						</form>
					</>
				)}

				{data?.user && <div>{JSON.stringify(data.user)}</div>}
			</div>
		</div>
	);
};

export default Register;
