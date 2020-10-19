import { useEffect, useState } from 'react';
import { getListFromDB } from '../helpers/db.api';

/**
 * useState hook that returns the queried list from the database, and a setter
 * @param {object} query query database list instance (list schema has properties _id, owner, name, content, to, from, sessions)
 * @returns {array} [list, setList]
 */
export const useGetList = (query) => {
    const [list, setList] = useState(null);

    useEffect(() => {
        getListFromDB(query)
            .then(res => setList(res))
            .catch(e => e)
    }, [])

    return [list, setList]
}