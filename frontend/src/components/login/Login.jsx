import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { LoginContext } from '../../context/LoginContext';
import { useRouteProps } from '../../hooks/routerHooks';
import { handleFormBlur } from '../../hooks/state';
import './style/Login.scss';

const Login = () => {
    const [user, setUser] = useState({}),
        { navigate } = useRouteProps(),
        [message, setMessage] = useState(null),
        [showPass, setShowPass] = useState(false),
        { login } = useContext(LoginContext),
        [authError, setErr] = useState(false);

    function handleLogin(e) {
        if (user.username?.length > 0 && user.password?.length > 0) {
            axios
                .post('/db/user', user)
                .then(r => {
                    login(r.data.username);
                    navigate(`/u/${r.data.username}`);
                })
                .catch(e => {
                    setErr(e)
                })
        } else {
            setMessage('Cannot log in without both username and password')
        }
    }

    return (
        <div className="PageWrapper">
            <div className="Login">

                <header className="Login__header">
                    You need to be logged in to view this page. Please log in or register.
                </header>

                {message &&
                    <div className="Login__message">
                        {message}
                    </div>
                }

                {authError?.response?.status === 401 &&
                    <div className="Login__error">
                        Incorrect credentials. Try again.
                    </div>
                }


                <form className="Login__form">

                    <header className="PageHeader">
                        Log in
                    </header>

                    <div className="Login__form--field">

                        <label
                            className="Login__input--label"
                            htmlFor="username"
                        >
                            Username
                        </label>

                        <div className="Login__form--field--content">
                            <input
                                className="Login__input--username"
                                onBlur={e => handleFormBlur(e, user, setUser)}
                                required
                                autoComplete="username"
                                type="text"
                                name="username"
                            />
                        </div>

                    </div>

                    <div className="Login__form--field">
                        <label
                            className="Login__input--label"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="Login__form--field--content">
                            <input
                                className="Login__input--password"
                                required
                                onBlur={e => handleFormBlur(e, user, setUser)}
                                autoComplete="password"
                                type={`${showPass ? 'text' : 'password'}`}
                                name="password"
                            />
                            <div
                                className="Login__showPassword"
                                style={{
                                    color: showPass ? 'white' : '#777',
                                    backgroundColor: showPass ? '#333' : '#333',
                                }}
                                onClick={() => setShowPass(showPass => !showPass)}
                                type="button"
                                value={showPass ? 'hide' : 'show'}
                            >
                                {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                    </div>

                    <div className="Login__buttons">
                        <input
                            className="Login__button"
                            onClick={handleLogin}
                            type="button"
                            value="Log in"
                        />
                        <Link
                            className="Login__register"
                            to="/register"
                        >
                            Register
                        </Link>
                    </div>

                </form>


            </div>
        </div>
    )
}

export default Login

/*
flow:
form submit button onClick sets setAuth(true)
    which causes useAuthenticateUser hook to run
        in which we make a post request to API to authenticate user
            if response: call login(), which updates LS and updates currentUser in LoginContext
            if error: nothing happens currently  */