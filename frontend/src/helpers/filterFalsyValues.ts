/**
 * Take an array and return a filtered version without null and undefined entries.
 */
export function filterFalsy<T>(array: Array<T>) {
    return array.filter(entry => (entry !== undefined) && (entry !== null))
}