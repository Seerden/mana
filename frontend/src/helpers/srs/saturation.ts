// @ts-nocheck

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { Maybe, Term } from "gql/codegen-output";
import { countDict } from "../count";
dayjs.extend(relativeTime);
dayjs.extend(duration);

const day = 1000 * 3600 * 24;
export const saturationLevels = [
	{
		level: 0,
		description: "Weak to no recollection.",
		timescale: day, // review within a day
	},
	{
		level: 1,
		description: "Middling short-term recollection.",
		timescale: 3 * day,
	},
	{
		level: 2,
		description: "Good short-term recollection.",
		timescale: 7 * day,
	},
	{
		level: 3,
		description: "Working towards long-term recollection",
		timescale: 14 * day,
	},
	{
		level: 4,
		description: "Long-term recollection achieved. Low review priority",
		timescale: 30 * day,
	},
];

/**
 * Assign a new saturation level to the given term: after every session, each reviewed term will have its saturation level determined based on current/recent performance.
 * Suggested review frequency is derived from this saturation level, meaning saturation is an integral part of our system.
 * @note saturation should be done on a per-term basis, since object structure for review input might not be rigid
 * @param {Object} term List model contains .content, which is an array of terms, of which this ('term') is an entry.
 */
export function saturate(term: Term, direction: Direction) {
	// filter term's history by direction
	const filteredHistory = termSessionsByDirection(term, direction);
	if (!filteredHistory || filteredHistory.length < 3) {
		return null;
	}

	if (filteredHistory.length === 3 || !term.saturation[direction]) {
		// if reviewed exactly n times, seeding has just ended, so we can saturate based on seeding round
		return saturateUnseededTerm(filteredHistory);
	} else if (filteredHistory.length > 3 || term.saturation[direction]) {
		const newSaturation = saturateSeededTerm(
			filteredHistory,
			term.saturation[direction]
		);
		return newSaturation;
	}
}

/**
 * Set saturation of a term that has finished undergoing seeding
 * @param {Object} term List model contains .content, which is an array of terms, of which this ('term') is an entry.
 */
export function saturateUnseededTerm(filteredHistory) {
	/*  @note
           initial seeding does not take into consideration:
            - time between sessions. minimum time between sessions will be enforced elsewhere for UX purposes, though
            - performance of first n-1 seeding rounds  */
	const latestSession = filteredHistory?.reverse()[0]?.content; // extract last seeding session content
	const sessionSet = new Set(latestSession);

	if (!latestSession || (latestSession && !(latestSession.length > 0))) {
		return false;
	}
	// post-seeding saturation is relatively simple: by now, all terms should _definitely_ be in short-term memory, so mistakes are judged harhsly
	// @todo: transform all 'pass' and 'fail' mentions by 1 and 0 respectively
	const passFailCount = countDict(latestSession);

	if (!sessionSet.has("fail")) {
		return 2;
	}
	if (passFailCount.fail > 1) {
		return 0;
	}
	return 1;
}

/**
 * Determine saturation of a term that already has a saturation level.
 * @param filteredHistory array of (at least 3) history entries, filtered by specified direction
 * @param {Number} saturation The term's current saturation level for the specified direction
 */
export function saturateSeededTerm(
	filteredHistory: Maybe<TermHistory>[],
	saturation: number | undefined | null
) {
	const [currentSession, previousSession, secondToLastSession] = filteredHistory
		.reverse()
		.slice(0, 3);
	// const timeBetween = currentSession?.date - previousSession?.date;
	// const currentTimescale = saturationLevels[Number(saturation)]?.timescale;

	if (currentSession && previousSession && secondToLastSession) {
		const fail = countDict(currentSession.content).fail;
		const previousFail = countDict(previousSession.content).fail;
		const secondTolastFail = countDict(secondToLastSession.content).fail;

		switch (
			String(saturation) // new saturation level depends on two things: current performance, current saturation level
		) {
			case "0":
				return fail ? 0 : 1;
			case "1":
				if (fail) {
					if (fail > 1) return 0;
					if (currentSession.content[0] === "pass") return 1;
					return 0;
				} else {
					if (!previousFail && !secondTolastFail) {
						return 2;
					}
					return 1;
				}
			case "2":
				if (fail) {
					if (fail > 2) return 0;
					return currentSession.content[0] === "pass" ? 2 : 1;
				} else {
					if (!previousFail) {
						return 3;
					}
				}
				break;
			case "3":
				if (fail) {
					if (fail === 1) {
						return 2;
					} else {
						return 1;
					}
				} else {
					if (!previousFail && !secondTolastFail) {
						return 4;
					}
					return 3;
				}
			case "4":
				if (fail) {
					return fail > 1 ? 2 : 3;
				} else return 4;
			default:
				return saturation;
		}
	}
}

/**
 * Use a term's history and the user's saturation timescales to extract terms past due for review (also includes terms that don't have a saturation level yet).
 * @note    currently there's a single saturationLevels object used for timescales. Eventually this might become user-defined
 * @note    currently including all terms without saturation level (i.e. terms in untouched or seeding stage).
 *              this doesn't work for terms that are in seeding that have been reviewed within a day (seeding spacing should be at least a day, I feel)
 * @param terms array of terms
 * @returns     object containing 'forwards' and 'backwards' array of term indices.
 */
export function suggestTermsForReview(terms: Term[]) {
	const now = Date.now().valueOf();

	return terms.reduce(
		(acc, curTerm) => {
			for (const direction of ["forwards", "backwards"]) {
				const sat = curTerm.saturation[direction];
				const lastReviewed = getLastReviewDateFromTerm(curTerm);
				if ([0, 1, 2, 3, 4].includes(sat)) {
					if (
						now - new Date(lastReviewed[direction]).valueOf() >
						saturationLevels[sat].timescale
					) {
						acc = { ...acc, [direction]: [...acc[direction], curTerm] };
					}
				} else {
					acc = { ...acc, [direction]: [...acc[direction], curTerm] };
				}
			}
			return acc;
		},
		{ forwards: [], backwards: [] }
	);
}

export function filterTermHistoryEntriesByDirection(
	history: Maybe<TermHistory>[],
	direction: Direction
) {
	if (history) {
		return history.filter((entry) => entry?.direction === direction);
	}
}

/**
 * Extract date of last 'forwards' and 'backwards' review from a term's history
 * @param {*} term
 */
export function getLastReviewDateFromTerm(term: Term) {
	const history = term.history;
	const forwards = filterTermHistoryEntriesByDirection(history, "forwards");
	const backwards = filterTermHistoryEntriesByDirection(history, "backwards");

	return {
		forwards: forwards?.reverse()[0]?.date || null,
		backwards: backwards?.reverse()[0]?.date || null,
	};
}

/**
 * Assign new saturation levels to each term based on
 * the user's performance in the review session that just occurred.
 * Each parameter is actually a piece of state,
 * so this function should be used in conjunction with useCallback
 */
export function makeNewSaturationLevels(
	termsToReview: Term[],
	termUpdateArray: TermUpdateObject[],
	direction: Direction
) {
	return termsToReview.map((termInReview) => {
		const termCopy = {
			// copy term, add this session's history to it
			...termInReview,
			history: [
				...[
					Object.keys(termInReview).includes("history") ? termInReview.history : [],
				],
				termUpdateArray.find((termToUpdate) => termInReview._id === termToUpdate._id)
					?.history,
			] as TermHistory[],
		};
		const saturation = {
			...termCopy.saturation,
			[direction]: saturate(termCopy, direction as Direction),
		};
		return {
			termId: termCopy._id,
			saturation,
		};
	});
}
