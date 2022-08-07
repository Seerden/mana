import { ReviewSessionEntryInput } from "gql/codegen-output";
import { SessionEntryWithoutTimeOnCard } from "../types/review.types";

/**
 * Shuffle the first entry of an array back into the array at a random spot. If
 * it's the only entry, return (a copy of) the given array.
 *
 * @note For render purposes (returning a different item in the case that the
 * array has length 1, allowing React to think it got a different object if
 * passed as a prop), we do a JSON parse/stringify. Note that this doesn't
 * accomplish what we want in the case that every property of the entry is a
 * complex object. We don't have any usecases like this though, as far as I know.
 */
export function shuffleFirstEntry<T>(array: T[]): T[] {
	let result: T[] = [];

	if (!array.length) return [];

	if (array.length === 1) {
		result = array;
	} else {
		const newIndex = Math.floor((array.length + 1) * Math.random());
		const arrayCopy = array.slice();
		const firstEntry = arrayCopy.shift();
		arrayCopy.splice(newIndex, 0, firstEntry);
		result = arrayCopy;
	}

	return result.map((entry) => JSON.parse(JSON.stringify(entry)));
}

export function shuffleArray<T>(array: T[]) {
	const arrayCopy = [...array]; // swap is done in-place, so keeping a copy is simply for convenience

	let i = arrayCopy.length - 1;
	while (i > 0) {
		// take item at i-th index and swap it in-place with a random item in [0, i] (can 'swap' with itself), then decrement i
		const j = Math.floor((i + 1) * Math.random());
		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
		i -= 1;
	}
	return arrayCopy;
}

/**
 * Build a Knuth shuffled list n times and concatenate.
 * @param n integer number of shuffled copies of the array to concatenate.
 */
export function shuffleRepeatedly<T>(array: T[], n: number) {
	let i = 0;
	const shuffled = [];
	while (i < n) {
		shuffled.push(shuffleArray<T>(array));
		i++;
	}

	return shuffled.flat();
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
