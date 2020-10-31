import React, { useEffect, useState } from "react";
import './style/Register.scss';
import { useLogState, handleFormBlur } from '../../hooks/state';
import { postUser} from '../../helpers/apiHandlers';

const Register = (props) => {
    const defaultUser = { username: null, password: null }
    const [response, setResponse] = useState(null);

    const [newUser, setNewUser] = useState(defaultUser);

    useLogState('new user', newUser)

    const handleSubmit = newUser => {
        postUser(newUser)
            .then(r => setResponse(r))
            .catch(err => console.log(err.response.status))
    }

    return (
        <div className="PageWrapper">
            <div className="Register">
                    {!response &&
                        <>
                            <div className="PageHeader">Register a new account</div>
                            <form className="Register__form">
                                <label htmlFor="username">Username</label>
                                <input onBlur={e => handleFormBlur(e, newUser, setNewUser)} type="text" name="username" />

                                <label htmlFor="password">Password</label>
                                <input onBlur={e => handleFormBlur(e, newUser, setNewUser)} type="password" name="password" />

                                <input onClick={() => handleSubmit(newUser)} className="Register__button" type="button" value="Register" />
                            </form>
                        </>
                    }

                    { response && 
                        <>
                            <div>
                                {JSON.stringify(response)}
                            </div>
                        </>
                    }

            </div>
        </div>
    )
}

export default Register

/*
    - should only be visible when not logged in, but include a check to confirm, anyway.
    - accounts are streamlined. only take username, password (figure out hashing)
*/