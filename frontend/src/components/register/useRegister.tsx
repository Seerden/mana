import { useMutateRegisterUser } from "gql/hooks/user-query";
import { useRouteProps } from "hooks/routerHooks";
import { useLogin } from "hooks/useLogin";
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
	if (!(username?.length > 0)) return "Must include username";
	if (!password.length || !repeatPassword.length) return "Must fill out password fields";
	if (!(password === repeatPassword)) return "Passwords don't match";
}

/**
 * Functionality for ./Register.tsx
 */
export function useRegister() {
	const { data, mutate: mutateRegisterUser } = useMutateRegisterUser();
	const [message, setMessage] = useState<string>(null);
	const { login } = useLogin();
	const { navigate } = useRouteProps();

	// TODO: this should be inside the onSuccess of useMutateRegisterUser()
	useEffect(() => {
		if (!data) return;

		const { createUser } = data;

		const { error, user } = createUser;

		if (error) setMessage(error);

		if (user) {
			login(user.username);
			navigate(`/u/${user.username}`);
		}
	}, [data]);

	const [newUser, setNewUser] = useState<
		NewUser & { repeatPassword: NewUser["password"] }
	>({
		username: "",
		password: "",
		repeatPassword: "",
	});

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;

			setNewUser((current) => {
				current[name] = value;
				return current;
			});
		},
		[newUser, setNewUser]
	);

	const handleSubmit = useCallback(() => {
		const message = newUserValidationMessage(newUser);
		if (message) {
			setMessage(message);
		} else {
			mutateRegisterUser(newUser);
		}
	}, [newUser, setMessage]);

	return { handleSubmit, handleChange, user: data?.createUser?.user, message } as const;
}
