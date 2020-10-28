import React, { useState, useContext } from "react";
import { LoginContext } from '../../context/LoginContext';
import './Login.scss';
import { useLogState, handleFormBlur } from '../../hooks/state';
import { authenticateUser } from '../../helpers/db.api';
import { Link } from 'react-router-dom';


const Login = (props) => {
    const [_user, _setUser] = useState({});
    const { currentUser, setUser } = useContext(LoginContext);

    const handlePost = (e, user) => {
        authenticateUser(user)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log('set user')
                    setUser(res.data.username);
                }
            })
            .catch(err => console.log(err))
    }

    return (
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

                <input onClick={(e) => handlePost(e, _user)} className="Login__button" type="button" value="Log in" />
                <Link to="/register">Register</Link>
            </form>


        </div>
    )
}

export default Login