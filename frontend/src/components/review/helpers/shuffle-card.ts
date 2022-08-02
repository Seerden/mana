import { Term } from "../../../gql/codegen-output";

/**
 * Shuffle the first term back into the array at a random spot. If it's the
 * only remaining card, return (a copy of) the given array.
 */
export function shuffleCurrentTerm(terms: Term[]) {
	if (terms.length === 1) {
		return terms.slice();
	}

	const newIndex = Math.floor((terms.length + 1) * Math.random());
	const termsCopy = terms.slice();
	const currentTerm = termsCopy.shift();
	termsCopy.splice(newIndex, 0, currentTerm);

	return termsCopy;
}
