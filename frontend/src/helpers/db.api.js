import axios from 'axios';
import { storeUser } from '../hooks/auth';
import { LoginContext } from '../context/LoginContext';
import { useContext, useState, useEffect, useCallback } from 'react';
import { useLogState } from '../hooks/state';
import { useRouteProps } from '../hooks/routerHooks';

axios.defaults.withCredentials = true;

// axios.interceptors.response.use(res => {
//     return res
// }, err => {
//     console.log('Not authenticated. Removing user from local storage');
//     storeUser(null, 'remove');
//     console.log('error response:', err.response)
//     Promise.reject(err.response.status)

//     // Promise.reject(err)
// })

// axios.interceptors.request.use(config => {
//     let user = storeUser(null, 'get');
//     if (!user) { 
//         throw new axios.Cancel('No user, canceling request.') 
//         // return config
//     }
// }, err => Promise.reject(err))

// axios.interceptors.request.use(req => {
//     console.log('axios request:', req)
//     return req
// })

const checkResponseError = e => {
    if (e.response.status === 401) {
        // api says request wasn't authorized. handle
        console.log('unauthorized');
    }
}

/**
 * Request hook that handles request and logs a user out if the API returns 401 Unauthorized.
 * @param {Function} request axios request initialized wrapper inside an anonymous function, e.g. () => axios.get('/home')
 * @param {Function} handleResponse function to handle successful response, will be called as request().then(r => handleResponse(r))
 * @param {Function} handleError function to handle error, form similar to handleResponse
 * @returns {[response: *, error: Boolean, loading: Boolean, makeRequest: Function]} [response, error] are returned states set by the handleResponse/handleError functions. loading is the loading state (true while request is being made), and makeRequest can be called to trigger a request
 */
export const useRequest = ({ request, handleResponse, handleError }) => {
    const
        { currentUser, login, logout } = useContext(LoginContext),
        { username } = useRouteProps().params,
        [fireRequest, setFireRequest] = useState(false),
        makeRequest = () => setFireRequest(true),
        [response, setResponse] = useState(null),
        [error, setError] = useState(null),
        [loading, setLoading] = useState(false),
        source = axios.CancelToken.source();

    const authorizeUser = (next, setError) => {
        if (username && (currentUser === username)) {
            next()
        } else {
            setLoading(false);
            setError('Route not accessible by current user.');
        }
    }

    useEffect(() => {  // verify if user should have access to the page, execute request or set error based on result
        if (fireRequest) {
            setLoading(true);

            function executeRequest() {
                request()
                    .then(res => {
                        handleResponse(res, setResponse)
                        setLoading(false);
                        setFireRequest(false);
                    })
                    .catch(err => {
                        setLoading(false);

                        if (err.response.status === 401) {
                            logout()
                        }

                        handleError(err, setError)
                        setFireRequest(false);
                    })
            }

            authorizeUser(executeRequest, setError)
        }
    }, [currentUser, fireRequest])

    useEffect(() => {  // if current user changes (e.g. because user was logged out by making unauthorized request), component will unmount, so we need to cancel any active requests
        return () => source.cancel("Component was unmounted")
    }, [currentUser])

    return { response, error, loading, makeRequest }
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
     * Update local list changes (e.g. term deletions, edits, or updated session/term histories) to the database
     * 
     * @param   {object}    query   database query for relevant list instance (combination of _id and owner should suffice)
     * @param   {object}    body    updated list content
     * 
     * @current         send entire list object to the backend as 'body',
     *                      backend sets list.content to body.content
     * @future          refine database call:
     *                      - allow user to specify fields that need to be updated
     *                      - implement this field udpating in the database     *      
     */
export const updateList = async (query, body) => {
    return axios.post('/db/list/update', {
        data: {
            query,
            body
        }
    })
        .then(res => res.data)
        .catch(e => {
            console.log(e.response)
            throw new Error(e)
        })
}

/**
 * Get all lists by the specific user from the database. Returns all list properties, except the content itself.
 * @param {string} username 
 */
export const getLists = async (username) => {
    return axios.get(`/db/listsbyuser/${username}`)
        .then(r => r.data)
        .catch(e => console.log('Error fetching from database:', e))
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
                axios.post('/db/user', user)
                    .then(r => {
                        setResponse(r.data)
                        login(r.data.username)
                    })
                    .catch(e => setErr(e))
            }
        })()
    }, [auth])
}


/* 

@todo:
    feature: distinguish between unauthorized request and request made by an authenticated user for another user's information
    solution: handle 401 and 403 requests separately

@todo: allow optional fireImmediately prop to be passed to useRequest to fire on component mount

*/
