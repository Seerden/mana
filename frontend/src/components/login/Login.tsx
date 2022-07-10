import { useMutateLogin, UserWithPassword } from "gql/hooks/login-mutate";
import { useLogin } from "hooks/useLogin";
import useRouteProps from "hooks/useRouteProps";
import { useCallback, useEffect, useState } from "react";
import { handleFormBlur } from "./helpers/handle-form-blur";
import LoginForm from "./sub/LoginForm";

const Login = () => {
	const { login } = useLogin();
	const { navigate } = useRouteProps();
	const [user, setUser] = useState<UserWithPassword>({ username: "", password: "" });
	const [showPass, setShowPass] = useState(false);
	const [authError, setErr] = useState<any>(false);
	const [message, setMessage] = useState<null | string>(null);

	const { mutate, data } = useMutateLogin();

	// TODO: the code from this effect should be executed in useMutateLogin's
	// onSuccess callback, instead.
	useEffect(() => {
		if (!data) return;

		const { error, user } = data;

		if (user?.username && typeof login === "function") {
			login(user.username);
			navigate(`/u/${user.username}`);
		} else if (error) {
			setErr(error);
		}
	}, [data]);

	/**
	 * Handle pressing of the 'log in' button: log user in and redirect to their profile page, or flash a relevant error.
	 */
	const handleLogin = useCallback(() => {
		const { username, password } = user;
		if (username?.length && password?.length) {
			mutate(user);
		} else {
			setMessage("You need to input a username and a password to be able to log in.");
		}
	}, [user]);

	const loginFormProps = {
		authError,
		user,
		setUser,
		showPass,
		setShowPass,
		message,
		handleFormBlur,
		handleLogin,
	};

	return <LoginForm {...loginFormProps} />;
};

export default Login;
