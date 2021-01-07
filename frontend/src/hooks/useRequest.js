import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import { useContext, useState, useEffect, useRef } from 'react';
import { useRouteProps } from './routerHooks';
import { handleError as defaultHandleError, handleResponse as defaultHandleResponse } from 'helpers/apiHandlers/apiHandlers';

/**
 * Request hook that handles a request and logs a user out if the API returns 401 Unauthorized.
 * @param {Function} request axios request initialized wrapper inside an anonymous function, e.g. () => axios.get('/home')
 * @param {Function} handleResponse function to handle successful response, will be called as request().then(r => handleResponse(r))
 * @param {Function} handleError function to handle error, form similar to handleResponse
 * @returns {{response: *, error, loading: Boolean, setRequest: Function}} [response, error] are returned states set by the handleResponse/handleError functions. loading is the loading state (true while request is being made), and makeRequest can be called to trigger a request
 * @param {Function} setRequest request is expected to wrapper in a function, so usage should be like setRequest(() => axios.get('/'))
 * 
 */
export const useRequest = ({ handleResponse, handleError }) => {
    const
        { currentUser, logout } = useContext(LoginContext),
        mounted = useRef(false),
        { params } = useRouteProps(),
        [request, setRequest] = useState(null),
        [response, setResponse] = useState(null),
        [error, setError] = useState(null),
        [loading, setLoading] = useState(false),
        source = axios.CancelToken.source();

    function authorizeUser(username, setError, next) {
        if (username && (currentUser === username)) {
            setError(null); // this fixes error persisting on route change from unauthorized -> authorized  @IMPORANT not needed if I rerender component fully on params change
            next();

        } else {
            setError('Route not accessible by current user.');
            setLoading(false);
        }
    }

    function executeRequest() {
        request()
            .then(res => {
                (handleResponse && handleResponse(res, setResponse)) || defaultHandleResponse(res, setResponse);
            })
            .catch(err => {
                if (err && err.response && err.response.status === 401) {
                    logout();
                }
                (handleError && handleError(err, setError)) || defaultHandleError(err, setError);
            });

        setLoading(false);
        setRequest(null); //  unsure if necessary
    }

    useEffect(() => {  // cleanup function. might be obsolete. look into it
        mounted.current = true

        if (params.username && params.username === currentUser) {
            setError(null)
            setRequest(null)
        }

        return () => {
            setError(null);
            setResponse(null);
            setLoading(false);
            setRequest(null)
            mounted.current = false
        }
    }, [])

    useEffect(() => {return () => source.cancel("Component unmounted")})  // cleanup axios requests on any unmount (note: need to not have deps array)

    useEffect(() => {  // verify if user should have access to the page, execute request or set error based on result
        if (mounted.current) {
            if (request) {
                setLoading(true);
                authorizeUser(params.username, setError, executeRequest)
            }
        }

    }, [request, params.username])

    useEffect(() => {  // if current user changes (e.g. because user was logged out by making unauthorized request), component will unmount, so we need to cancel any active requests
        return () => source.cancel("Component was unmounted")
    }, [currentUser])

    return { response, error, loading, setRequest }
}