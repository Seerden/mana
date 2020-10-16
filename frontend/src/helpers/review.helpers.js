export const buildTermList = (terms, n) => {
    /*  
    input: content property of db List instance, which is an array of (presumably unique) objects with keys 'from' and 'to'
    output: a single joined array of two Knuth-shuffled copies of the input array
    */

    let shuffled = []

    const makeList = () => {
        const copy = [...terms]
        const indices = []
        /* 
        although we swap the actual values in-place, it's just easier to create a copy here, 
        since I do the building (at least) twice
        */

        let len = copy.length;
        let i = len - 1;
        let j;
        while (i > 0) {
            /*
            take item at i-th index and swap it with a random item in [0, i] (can 'swap' with itself)
            this swaps in-place
            */
            j = Math.floor((i + 1) * Math.random());
            [copy[i], copy[j]] = [copy[j], copy[i]];
            indices.push(j)

            i -= 1
        }
        return copy
    }

    let i = 0;
    while (i < n) {
        shuffled = [...shuffled, ...makeList()]
        i++
    }

    return shuffled
}