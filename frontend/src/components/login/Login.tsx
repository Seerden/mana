import { useMutateLogin, UserWithPassword } from "gql/hooks/login-mutate";
import { useRouteProps } from "hooks/routerHooks";
import { handleFormBlur } from "hooks/state";
import { useLogin } from "hooks/useLogin";
import { useCallback, useEffect, useState } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
    const { login } = useLogin();
    const { navigate } = useRouteProps();
    const [user, setUser] = useState<UserWithPassword>({ username: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [authError, setErr] = useState<any>(false);
    const [message, setMessage] = useState<null | string>(null);

    // @refactor -- extract to gql query file
    const { mutate, data } = useMutateLogin();

    useEffect(() => {
        if (data) {
            const { error, user } = data;
            if (user?.username && typeof login === "function") {
                login(user.username);
                navigate(`/u/${user.username}`);
            } else if (error) {
                setErr(error);
            }
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
            setMessage("Cannot log in without both username and password");
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
