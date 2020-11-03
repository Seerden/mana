import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import { useContext, useState, useEffect } from 'react';

axios.defaults.withCredentials = true;

/**
 * Get a user instance from the database
 * @param {string} username 
 * @param {object} args args.populate needs to be a single space-separated string, e.g. 'following followed'
 *                      nested population wouldn't work this way
 */
export const getUser = async (username, args) => {
    return await axios.get(`/db/u/${username}${args && args.populate ? `?populate=${args && args.populate}` : ''}`)
        .then(res => res.data)
        .catch(err => err)
}

/**
 * Authenticate and authorize the user against the Passport.js validation
 * Single endpoint for both registration and login, as the backend route checks whether or not user exists, and creates one if not.
 * @param {Object} user object with 'username' and 'password' keys
 * @return {Object} returns status: 4xx if not validated, 2xx if validated)
 */
export const useAuthenticateUser = (auth, user) => {
    const { currentUser, login } = useContext(LoginContext);
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


/*  @todo: handle 401 and 403 responses separately
    @todo: allow optional fireImmediately prop to be passed to useRequest to fire on component mount  */
