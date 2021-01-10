/**
 * Build a Knuth shuffled list n times and concatenate
 * @param {Array} terms input array
 * @param {Number} n integer number of shuffled copies of the list to concatenate
 * @return {Array}
 */
export function makeReviewList(terms, n) {
    let shuffled = [];

    function makeList() {
        const copy = [...terms] // swap is done in-place, so keeping a copy is simply for convenience
        const indices = []

        let len = copy.length
        let i = len - 1
        let j
        while (i > 0) {  // take item at i-th index and swap it in-place with a random item in [0, i] (can 'swap' with itself), then decrement i
            j = Math.floor((i + 1) * Math.random());
            [copy[i], copy[j]] = [copy[j], copy[i]]
            indices.push(j)
            i -= 1
        }
        return copy
    }

    let i = 0
    while (i < n) {
        shuffled = [...shuffled, ...makeList()]
        i++
    }

    return shuffled
}

export function convertDateListToDeltaTime(list, start) {
    let dts = [];

    for (let i = 0; i < list.length; i++) {
        if (i === 0) {
            dts.push(list[i] - start);
            
        } else {
            dts.push(list[i] - list[i-1])
        } 
    }

    return dts;
}