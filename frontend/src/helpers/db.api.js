import axios from 'axios';

// axios.interceptors.request.use(req => {
//     console.log('axios request:', req)
//     return req
// })

/**
     * Gets a list instance from the database
     * @param   query   object with keys { _id, owner, name, from, to, content }, matching the properties of the list schema in the database
     */
export const getListFromDB = async (query) => {
    return axios.get('/db/list/', { params: query })
        .then(r => r.data)
        .catch(e => console.log(e))
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
export const getListsByUser = async (username) => {
    return axios.get(`/db/listsbyuser/${username}`)
        .then(r => r.data)
        .catch(e => console.log('Error fetching from database:', e))
}