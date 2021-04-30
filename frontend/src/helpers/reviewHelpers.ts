/**
 * Build a Knuth shuffled list n times and concatenate
 * @param {Number} n integer number of shuffled copies of the list to concatenate
 */
export function makeReviewList(terms: any[], n: number): any[] { // @todo: use to-be-defined global Terms interface for types
    let shuffled: any[] = [];

    function makeList() { // @todo: extract to outside makeReviewList. why is it nested in here anyway?
        const copy = [...terms]; // swap is done in-place, so keeping a copy is simply for convenience
        const indices: number[] = [];

        let len = copy.length;
        let i = len - 1;
        while (i > 0) {  // take item at i-th index and swap it in-place with a random item in [0, i] (can 'swap' with itself), then decrement i
            const j = Math.floor((i + 1) * Math.random());
            [copy[i], copy[j]] = [copy[j], copy[i]];
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
    let dts: any[] = [];

    for (let i = 0; i < list.length; i++) {
        if (i === 0) {
            dts.push(list[i] - start);
            
        } else {
            dts.push(list[i] - list[i-1])
        } 
    }

    return dts;
}