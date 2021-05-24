import { Term } from "graphql/codegen-output";

function shuffleTerms(terms: Term[]) { // @todo: extract to outside makeReviewList. why is it nested in here anyway?
    const termsCopy = [...terms];  // swap is done in-place, so keeping a copy is simply for convenience
    const indices: number[] = [];

    let i = termsCopy.length - 1;
    while (i > 0) {  // take item at i-th index and swap it in-place with a random item in [0, i] (can 'swap' with itself), then decrement i
        const j = Math.floor((i + 1) * Math.random());
        [termsCopy[i], termsCopy[j]] = [termsCopy[j], termsCopy[i]];
        indices.push(j);
        i -= 1;
    }
    return termsCopy;
}

/**
 * Build a Knuth shuffled list n times and concatenate
 * @param n integer number of shuffled copies of the list to concatenate
 */
export function makeReviewList(terms: Term[], n: number): any[] {
    let shuffled: Term[] = [];

    let i = 0;
    while (i < n) {
        shuffled = [...shuffled, ...shuffleTerms(terms)];
        i++;
    }

    return shuffled;
}

export function convertDateListToDeltaTime(list: Date[], start: Date) {
    let timeDeltaArray: number[] = [];

    for (let i = 0; i < list.length; i++) {
        if (i === 0) {
            timeDeltaArray.push(list[i].valueOf() - start.valueOf());

        } else {
            timeDeltaArray.push(list[i].valueOf() - list[i - 1].valueOf())
        }
    }

    return timeDeltaArray;
}