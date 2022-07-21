import { UserInput } from "gql/codegen-output";
import { useCreateUser } from "gql/hooks/user/useCreateUser";
import { useLogin } from "hooks/useLogin";
import useRouteProps from "hooks/useRouteProps";
import { useCallback, useEffect, useState } from "react";

type NewUserFormValues = {
	username: string;
	password: string;
	repeatPassword: string;
};

/**
 * Check if newUser is a valid new user. If not, return a message for display.
 * @todo - consider extracting to helper file
 */
function newUserValidationMessage(newUser: NewUserFormValues) {
	const { username, password, repeatPassword } = newUser;
	if (!username?.length) return "Must include username";
	if (!password.length || !repeatPassword.length) return "Must fill out password fields";
	if (!(password === repeatPassword)) return "Passwords don't match";
}

/** Functionality for ./Register.tsx */
export function useRegister() {
	const { data, error, mutate } = useCreateUser();
	const [message, setMessage] = useState<string>(null);
	const { login } = useLogin();
	const { navigate } = useRouteProps();

	// TODO: this should be inside the onSuccess of useCreateUser()
	useEffect(() => {
		if (!data) return;

		if (error) setMessage(error);

		const { username } = data;

		if (username) {
			login(username);
			navigate(`/u/${username}`);
		}
	}, [data]);

	const [newUser, setNewUser] = useState<
		UserInput & { repeatPassword: UserInput["password"] }
	>({
		username: "",
		password: "",
		repeatPassword: "",
	});

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;

			setNewUser((current) => ({ ...current, [name]: value }));
		},
		[newUser, setNewUser]
	);

	const handleSubmit = useCallback(() => {
		const message = newUserValidationMessage(newUser);

		if (message) {
			setMessage(message);
		} else {
			mutate(newUser);
		}
	}, [newUser, setMessage]);

	return { handleSubmit, handleChange, user: data, message } as const;
}
