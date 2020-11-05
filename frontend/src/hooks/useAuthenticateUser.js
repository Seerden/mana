import { LoginContext } from '../context/LoginContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Authenticate and authorize the user against the Passport.js validation
 * Single endpoint for both registration and login, as the backend route checks whether or not user exists, and creates one if not.
 * @param {Object} user object with 'username' and 'password' keys
 * @return {Object} returns status: 4xx if not validated, 2xx if validated)
 */
export const useAuthenticateUser = (auth, user) => {
    const { login } = useContext(LoginContext);
    const [response, setResponse] = useState(null);
    const [err, setErr] = useState(false);

    useEffect(() => {

        (function () {
            if (auth) {
                axios.post('/db/user', user)
                    .then(r => {
                        setResponse(r.data.username)
                        login(r.data.username)
                    })
                    .catch(e => setErr(e))
            }
        })()
    }, [auth])

    return [response, err]
}