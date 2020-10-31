import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from '../../context/LoginContext';
import './style/Login.scss';
import { useLogState, handleFormBlur } from '../../hooks/state';
import { useRouteProps } from '../../hooks/routerHooks';
import { useAuthenticateUser } from '../../helpers/db.api';
import { Link } from 'react-router-dom';


const Login = (props) => {
    const [_user, _setUser] = useState({});
    const { navigate, location } = useRouteProps();
    const { currentUser } = useContext(LoginContext);
    const [auth, setAuth] = useState(false);

    const [authResponse, authError] = useAuthenticateUser(auth, _user);

    useEffect(() => {
        if (authResponse) {
            navigate(`/u/${authResponse}`)
        }
    }, [authResponse])

    return (
        <div className="PageWrapper">
            <div className="Login">
                <div className="PageHeader">You're not currently logged in. Log in or register.</div>
                <form className="Login__form">
                    <header className="Login__form--header">
                        Log in
                    </header>

                    <label htmlFor="username">Username</label>
                    <input onBlur={e => handleFormBlur(e, _user, _setUser)} type="text" name="username" />

                    <label htmlFor="password">Password</label>
                    <input onBlur={e => handleFormBlur(e, _user, _setUser)} type="password" name="password" />

                    <input onClick={() => setAuth(true)} className="Login__button" type="button" value="Log in" />
                    <Link to="/register">Register</Link>
                </form>


            </div></div>
    )
}

export default Login

/* 
flow:
form submit button onClick sets setAuth(true)
    which causes useAuthenticateUser hook to run
        in which we make a post request to API to authenticate user
            if response: call login(), which updates LS and updates currentUser in LoginContext
            if error: nothing happens currently


*/