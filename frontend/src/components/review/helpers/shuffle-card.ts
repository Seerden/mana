import { Term } from "../../../gql/codegen-output";

/**
 * Shuffle the first term back into the array at a random spot. If it's the
 * only remaining card, return (a copy of) the given array.
 *
 * @note In both cases, we take the created array and do .map(t => ({...t})).
 * This is to create a sort-of deep clone (since Terms have at least some
 * non-nested properties). This way, ReviewCard will think it got a different
 * Term, even if maybe it's actually the same term in reality. This way we reset
 * the internal state of ReviewCard.
 */
export function shuffleCurrentTerm(terms: Term[]) {
	if (terms.length === 1) {
		return terms.map((term) => ({ ...term }));
	}

	const newIndex = Math.floor((terms.length + 1) * Math.random());
	const termsCopy = terms.slice();
	const currentTerm = termsCopy.shift();
	termsCopy.splice(newIndex, 0, currentTerm);

	return termsCopy.map((term) => ({ ...term }));
}
