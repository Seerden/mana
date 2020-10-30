import axios from 'axios';

axios.default.withCredentials = true;

// handleError and handleResponse are generic handlers
export const handleError = function(err, setError) { setError(err) };

export const handleResponse = (res, setResponse) => setResponse(res.data);

export const handleGetList = () => {
    const request = (username, query) => {axios.get(`/db/u/${username}/list`, { params: query })};
    return { request, handleResponse, handleError }
}

export const handlePostList = () => {
    const request = (username, body) => axios.post(`/db/u/${username}list`, { newList: body })
    return { request, handleResponse, handleError }
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

export const handlePutList = () => { return { handleResponse, handleError } }

export const handleDeleteList = () => {
    const request = (username, query) => axios.delete(`/db/u/${username}/list`, { params: query });
    return { request, handleResponse, handleError }
}

/**
 * Get all lists by the specific user from the database. Returns all list properties, except the content itself.
 * @param {string} username 
 */
export const handleGetLists = () => {
    const request = (username) => axios.get(`/db/u/${username}/lists`)
    return { request, handleResponse, handleError }
}



// above are full handlers, these are just the requests. 
export const getList = (username, query) => {
    return () => axios.get(`/db/u/${username}/list`, { params: query });
}

export const putList = (username, query, body) => {
    return () => axios.put(`/db/u/${username}/list`, { data: { query, body } })
}

export const postList = (username, body) => {
    return () => axios.post(`/db/u/${username}/list`, { newList: body })
}

export const deleteList = (username, query) => {
    return () => axios.delete(`/db/u/${username}/list`, { params: query })
}

export const getLists = (username) => {
    return () => axios.get(`/db/u/${username}/lists`)
}