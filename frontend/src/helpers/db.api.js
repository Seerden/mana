import axios from 'axios';

// axios.interceptors.request.use(req => {
//     console.log('axios request:', req)
//     return req
// })

/**
     * Get a list instance from the database
     * @param {object} query object with keys matching database listSchema
     */
export const getList = async (query) => {
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
    return await axios.get(`/db/u/${username}${ args && args.populate ? `?populate=${ args && args.populate}` : ''}`)
        .then(res => res.data)
        .catch(err => { throw new Error('Error getting user from database') })
}

/**
 * Delete list from database
 */
export const deleteList = async (query) => {
    axios.delete('/db/list', { params: query })
        .then(r => r.data)
        .catch(e => e)
}

export const postList = async body => {
    axios.post('/db/list')
}