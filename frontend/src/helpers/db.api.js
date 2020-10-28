import axios from 'axios';
import { storeUser } from '../hooks/auth';

axios.defaults.withCredentials = true;

// axios.interceptors.response.use(res => {
//     return res
// }, err => {
//     storeUser(null, 'remove');
//     console.log('error received:',err);
//     Promise.reject(err)
//     // console.log(err);
//     // throw new axios.Cancel('cancelled request: not logged in')
// })

// axios.interceptors.request.use(config => {
//     let user = storeUser(null, 'get');
//     if (!user) { 
//         console.log('no user, cancelling axios request');    
//         return config
//     }
//     return config
// }, err => Promise.reject(err))

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
    console.log('posting lost');
    return await axios.post('/db/list', {newList}, {withCredentials: true})
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
export const authenticateUser = async (user) => {
    console.log('authenticating user')
    return await axios.post('/db/user', user)
        .then(r => r)
        .catch(e => e)
}
