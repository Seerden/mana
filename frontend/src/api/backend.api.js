/* any reusable function that interacts with the backend gets stored here */

import axios from 'axios';

/* 
    pings backend /db/u/:username, which returns a User instance in json format
    might be better to just separate this into getUser and getPopulatedUser like I originally implemented
 */
export const getUserFromDb = async (username, args) => {
    let populate = null;
    if (args.populate) {
        const { populate } = args
        // populate needs to be a single space-separated string, e.g. 'following followed'
        // if nested population needs to be done, this method won't work. solve that dilemma if it ever becomes relevant
        return await axios.get(`/db/u/${username}?populate=${populate}`).then(res => res.data)
    } else {
        return await axios.get(`/db/u/${username}`).then(res => res.data)
    }
}