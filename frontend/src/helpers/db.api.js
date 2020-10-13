import axios from 'axios';

export const getListFromDB = async (query) => {
    /**
     * Gets a list instance from the database
     * @param   query   object with keys { _id, owner, name, from, to, content }, matching the properties of the list schema in the database
     */

    axios.create().interceptors.request.use(req => console.log('axios request:', req))

    return axios.get('/db/list/', {params: query})
        .then(r => r.data)
        .catch(e => {
            throw new Error('Could not get list from database:'); 
        })
}