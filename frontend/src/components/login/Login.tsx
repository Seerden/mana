import React, { useState, useEffect, useContext } from "react";
import { useRouteProps } from 'hooks/routerHooks';
import { handleFormBlur } from 'hooks/state';
import LoginForm from './LoginForm';
import { useMutation, useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { MaybeUser } from 'gql/codegen-output'
import { useLogin } from "hooks/useLogin";

const Login = () => {
    const { login } = useLogin();;
    const { navigate } = useRouteProps();
    const [user, setUser] = useState<{ username: string, password: string } | null>(null);
    const [showPass, setShowPass] = useState(false);
    const [authError, setErr] = useState<any>(false);
    const [message, setMessage] = useState<null | string>(null);

    const { mutate, data, ...rest } = useMutation<MaybeUser>("login", async () => {
        const { login } = await request(process.env.GRAPHQL_URI, gql`
            mutation {
                login(username: "${user?.username}", password: "${user?.password}") {
                    error 
                    user {
                        username
                        _id
                    }
                }
            }
        `);

        return login;
    }, { retry: false });

    useEffect(() => {
        console.log(data);
        if (data) {
            const { error, user } = data;
            console.log(user);
            console.log(error);
    
            if (user?.username && typeof login === 'function') {
                login(user?.username);
                navigate(`/u/${user?.username}`);
            }
    
            else if (error) {
                setErr(error)
            }
        }
    }, [data])

    /**
     * Handle pressing of the 'log in' button: log user in and redirect to their profile page, or flash a relevant error.
     */
    function handleLogin(e: React.SyntheticEvent) {
        if (user && user.username?.length > 0 && user.password?.length > 0) {
            mutate();
        } else {
            setMessage('Cannot log in without both username and password')
        }
    }

    const loginFormProps = { authError, user, setUser, showPass, setShowPass, message, handleFormBlur, handleLogin };

    return (
        <LoginForm {...loginFormProps} />
    )
}

export default Login