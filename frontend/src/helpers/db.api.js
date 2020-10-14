import axios from 'axios';

axios.create({timeout: 2000}).interceptors.request.use(req => console.log('axios request:', req))

export const getListFromDB = async (query) => {
    /**
     * Gets a list instance from the database
     * @param   query   object with keys { _id, owner, name, from, to, content }, matching the properties of the list schema in the database
     */

    return axios.get('/db/list/', {params: query})
        .then(r => r.data)
        .catch(e => {throw new Error('Could not get list from database:'); })
}

export const updateList = async (query, body) => {
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

    return axios.post('/db/list/update', { 
        data: {
            query,
            body
        }
    })
        .then(res => res.data)
        .catch(e => {
            console.log(e.response)
            throw new Error (e)
        })
}