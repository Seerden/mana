import { ReviewSessionEntryInput, Term } from "gql/codegen-output";
import { SessionEntryWithoutTimeOnCard } from "../types/review.types";

/** TODO: this can be named much more generically */
function shuffleTerms(terms: Term[]) {
	const termsCopy = [...terms]; // swap is done in-place, so keeping a copy is simply for convenience
	const indices: number[] = [];

	let i = termsCopy.length - 1;
	while (i > 0) {
		// take item at i-th index and swap it in-place with a random item in [0, i] (can 'swap' with itself), then decrement i
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
export function makeReviewList(terms: Term[], n: number) {
	let shuffled: Term[] = [];

	let i = 0;
	while (i < n) {
		shuffled = [...shuffled, ...shuffleTerms(terms)];
		i++;
	}

	return shuffled;
}

/**
 * Add time_on_card values to a list of session entries, derived from a session
 * start_date.
 *
 * Does not mutate in place. Returns a new array.
 */
export function entriesWithTimeOnCard(
	start_date: number,
	entries: SessionEntryWithoutTimeOnCard[]
) {
	return entries.reduce((acc, entry) => {
		let time_on_card: number;

		// first entry's time_on_card is compared to the review session's start_date
		if (!acc.length) {
			time_on_card = entry.created_at - start_date;
			// all other time_on_card values are by comparison to the previous entry's time_on_card
		} else {
			time_on_card = entry.created_at - acc.at(-1).created_at;
		}

		acc.push({ ...entry, time_on_card });

		return acc;
	}, [] as Array<ReviewSessionEntryInput>);
}
