/**
 * Takes an array and returns dictionary of all unique entries and their occurrence rate
 * @param {Array} array 
 * @returns {Object} the keys are the array's unique items, the values are their occurrence rates
 */
export const countDict = array => array.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0 ) + 1
    return acc
}, {})