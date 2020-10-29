import axios from 'axios';

// handleError and handleResponse are generic handlers
const handleError = (err, setError) => {  // called from within useRequest, from which we obtain err, setError
    setError(err.response);
}

const handleResponse = (res, setResponse) => { // called from within useRequest, from which we obtain res, setResponse
    setResponse(res.data);
}

export const handleGetList = (username, query) => {
    const request = () => axios.get(`/db/u/${username}/list`, { params: query });
    return { request, handleResponse, handleError }
}

export const handlePostList = (username, body) => {
    const request = () => axios.post(`/db/u/${username}list`, { newList: body })
    return { request, handleResponse, handleError }
}

export const handlePutList = (username, query, body) => {
    const request = () => {
        axios.post(`/db/u/${username}/list/update`, { data: { query, body } })
    }
    return { request, handleResponse, handleError }
}

export const handleDeleteList = (username, query) => {
    const request = () => { axios.delete(`/db/u/${username}/list`, { params: query }) }
    return { request, handleResponse, handleError }
}

export const handleGetLists = (username) => {
    const request = () => axios.get(`/db/u/${username}/lists`)
    return ({ request, handleResponse, handleError })
}