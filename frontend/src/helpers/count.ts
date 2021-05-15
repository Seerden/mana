/**
 * Takes an array and returns dictionary of all unique entries in the array and their occurrence rate.
 * Primarily to be used with non-complex array entries (strings, numbers, etc.)
 */
export const countDict = (array: any[]): any => array.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0 ) + 1
    return acc
}, {})