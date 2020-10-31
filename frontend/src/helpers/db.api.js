import axios from 'axios';
import { storeUser } from '../hooks/auth';
import { LoginContext } from '../context/LoginContext';
import { useContext, useState, useEffect } from 'react';

axios.defaults.withCredentials = true;

const checkResponseError = e => {
    if (e.response.status === 401) {
        // api says request wasn't authorized. handle
        console.log('unauthorized');
    }
}

/**
     * Get a list instance from the database
     * @param {object} query object with keys matching database listSchema
     */
export const getList = async (query) => {
    return axios.get('/db/list/', { params: query })
        .then(r => r.data)
        .catch(e => {
            checkResponseError(e)
        })
}

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
 * Delete list from database
 */
export const deleteList = async (query) => {
    return await axios.delete('/db/list', { params: query })
        .then(r => r.data)
        .catch(e => e)
}

export const postList = async newList => {
    return await axios.post('/db/list', { newList }, { withCredentials: true })
        .then(r => r)
        .catch(e => {
            storeUser(null, 'remove')
            console.log('error posting list');
            console.log(e);
        })
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
                console.log('posting user to db')
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


/* 

@todo:
    feature: distinguish between unauthorized request and request made by an authenticated user for another user's information
    solution: handle 401 and 403 requests separately

@todo: allow optional fireImmediately prop to be passed to useRequest to fire on component mount

*/
