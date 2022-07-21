import { useMutateLogin } from "gql/hooks/login-mutate";
import { useLogin } from "hooks/useLogin";
import useRouteProps from "hooks/useRouteProps";
import { useCallback, useState } from "react";
import { User, UserInput } from "../../gql/codegen-output";
import { handleFormBlur } from "./helpers/handle-form-blur";
import LoginForm from "./sub/LoginForm";

const Login = () => {
	const { login } = useLogin();
	const { navigate } = useRouteProps();
	const [user, setUser] = useState<UserInput>({ username: "", password: "" });
	const [showPass, setShowPass] = useState(false);
	const [authError, setErr] = useState<any>(false);
	const [message, setMessage] = useState<null | string>(null);

	const { mutate } = useMutateLogin({
		onError: (err) => setErr(err),
		onSuccess: (user: User) => {
			if (!user) return;

			login(user.username);
			navigate(`/u/${user.username}`);
		},
	});

	/**
	 * Handle pressing of the 'log in' button: log user in and redirect to their
	 * profile page, or flash a relevant error.
	 */
	const handleLogin = useCallback(() => {
		if ([user.username, user.password].some((x) => !x?.length)) {
			return setMessage(
				"You need to input a username and a password to be able to log in."
			);
		}

		mutate(user);
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
