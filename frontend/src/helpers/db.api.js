import axios from 'axios';

export const getListFromDB = (query) => {
    /**
     * Gets a list instance from the database
     * @param   query   db list schema takes owner, name, from, to, content
     */

    axios.create().interceptors.request.use(req => console.log('axios request:', req))
    return axios.get('/db/list/', {query})

}