import React, { useEffect, useState } from "react";
import './Register.scss';
import { useLogState, handleFormBlur } from '../../hooks/state';
import { useAuthenticateUser } from '../../helpers/db.api';

const Register = (props) => {
    const defaultUser = {username: null, password: null}

    const [newUser, setNewUser] = useState(defaultUser);
    const [auth, setAuth] = useState(false); 

    useAuthenticateUser(auth, newUser);
    
    useLogState('new user', newUser)
    
    // const handlePost = (e, user) => {
    //     e.preventDefault();
    //     useAuthenticateUser(user)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }

    return (
        <div className="PageWrapper">
            <div className="Register">
                <div className="PageHeader">Register a new account</div>
                <form className="Register__form">
                    <label htmlFor="username">Username</label>
                    <input onBlur={e => handleFormBlur(e, newUser, setNewUser)} type="text" name="username"/>

                    <label htmlFor="password">Password</label>
                    <input onBlur={e => handleFormBlur(e, newUser, setNewUser)} type="password" name="password"/>
                    <input id="Register__button__show-password"type="button" value="show password"/>

                    <input onClick={() => setAuth(true)} className="Register__button"type="button" value="Register"/>
                </form>
            </div>
        </div>
    )
}

export default Register

/* 
    - should only be visible when not logged in, but include a check to confirm, anyway.
    - accounts are streamlined. only take username, password (figure out hashing)
*/