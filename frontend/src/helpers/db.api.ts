import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * Get a user instance from the database
 * @param {string} username 
 * @param {object} args args.populate needs to be a single space-separated string, e.g. 'following followed'
 *                      nested population wouldn't work this way
 */
export const getUser = async (username: string, args: {populate: string[]}) => {  // @todo: checkif populate is indeed a string[]
    return await axios.get(`/db/u/${username}${args && args.populate ? `?populate=${args && args.populate}` : ''}`)
        .then(res => res.data)
        .catch(err => err)
}

/*  @todo: handle 401 and 403 responses separately
    @todo: allow optional fireImmediately prop to be passed to useRequest to fire on component mount  */
