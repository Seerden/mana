import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { LoginContext } from 'context/LoginContext';
import { useRouteProps } from 'hooks/routerHooks';
import { handleFormBlur } from 'hooks/state';
import LoginForm from './LoginForm';

const Login = () => {
    const { login } = useContext(LoginContext),
        { navigate } = useRouteProps(),
        [user, setUser] = useState<{username: string, password: string} | null>(null),
        [showPass, setShowPass] = useState(false),
        [authError, setErr] = useState(false),
        [message, setMessage] = useState<null | string>(null);

    /**
     * Handle pressing of the 'log in' button: log user in and redirect to their profile page, or flash a relevant error.
     * @param {React.SyntheticEvent} e 
     */
    function handleLogin(e) {
        if (user && user.username?.length > 0 && user.password?.length > 0) {
            axios
                .post('/db/user', user)
                .then(r => {
                    if (typeof login === 'function') {
                        login(r.data.username);
                        navigate(`/u/${r.data.username}`);
                    }
                })
                .catch(e => {
                    setErr(e)
                })
        } else {
            setMessage('Cannot log in without both username and password')
        }
    }

    const loginFormProps = { authError, user, setUser, showPass, setShowPass, message, handleFormBlur, handleLogin };

    return (
        <LoginForm { ...loginFormProps }/>
    )
}

export default Login