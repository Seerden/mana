import axios from 'axios';

axios.default.withCredentials = true;

// New user registration: unprotected route, can't currently be called using useRequest
export const postUser = newUser => {
    return axios.post('/db/u/register', {newUser})
        .then(r => r.data)
        .catch(err => err)
}

export function handleError (err, setError) { setError(err) };
export function handleResponse (res, setResponse) { setResponse(res.data) };