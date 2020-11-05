import axios from 'axios';

// ----- Set-related requests -----
/**
 * Get request for a single set
 * @param {String} username username string
 * @param {Object} query mongoose query object
 */
export const getSet = (username, query) => {
    return () => {
        axios.get(`/db/u/${username}/set`, { params: query })
    }
}

/**
 * Post request for a newly created set
 * @param {String} username username string
 * @param {Object} body new Set object
 */
export const postSet = (username, body) => {
    return () => {
        axios.post(`/db/u/${username}/set`, { newSet: body })
    }
}

/**
 * Put request to update a single set
 * @param {String} username username string
 * @param {Object} query mongoose query object
 * @param {Object} body fields (with their corresponding new values) to be updated
 */
export const putSet = (username, query, body) => {
    return () => {
        axios.put(`/db/u/${username}/set`, { data: { query, body } })
    }
}

/**
 * Delete request for a single set
 * @param {String} username username string
 * @param {Object} query mongoose query object
 */
export const deleteSet = (username, query) => {
    return () => {
        axios.delete(`/db/u/${username}/set`, { params: query })
    }
}