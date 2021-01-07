import axios from 'axios';

/**
 * GET a number of review sessions
 * @todo use query object to GET by username or by list name
 * @param {String} username 
 * @param {Object} query 
 */
function getSession (username, query) {
    return () => axios.get(`/db/u/${username}/session/`)
}

/**
 * POST a new review session
 * @param {String} username 
 * @param {Object} body 
 */
function postSession (username, body) {
    return () => axios.post(`/db/u/${username}/session`, { newReviewSession })
}