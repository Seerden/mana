import { Term, TermHistory } from "gql/codegen-output";
import { termSessionsByDirection } from "helpers/list.api";
import {
	filterTermHistoryEntriesByDirection,
	getLastReviewDateFromTerm,
} from "./saturation";

const DIRECTIONS = {
	FORWARDS: "forwards" as Direction,
	BACKWARDS: "backwards" as Direction,
};

const mockTermWithHistory: Partial<Term> = {
	history: [
		{
			date: new Date(),
			content: [],
			direction: DIRECTIONS.FORWARDS,
		},
	],
};

describe("filterTermHistoryEntriesByDirection", () => {
	test("... returns empty array for term without history entries for given direction", () => {
		expect(
			filterTermHistoryEntriesByDirection(
				mockTermWithHistory.history!,
				DIRECTIONS.BACKWARDS
			)
		).toStrictEqual([]);
	});

	test("... returns one backwards entry if only one forwards entry exists", () => {
		const history: TermHistory[] = [
			{
				date: new Date(),
				content: ["pass", "pass"],
				direction: DIRECTIONS.BACKWARDS,
			},
		];
		expect(filterTermHistoryEntriesByDirection(history, DIRECTIONS.BACKWARDS)).toEqual(
			history
		);

		expect(
			filterTermHistoryEntriesByDirection(history, DIRECTIONS.BACKWARDS)
		).toHaveLength(1);
	});

	test("... returns two forwards entries if only one forwards entry exists", () => {
		const history: TermHistory[] = [
			{
				date: new Date(),
				content: ["pass", "pass"],
				direction: DIRECTIONS.FORWARDS,
			},
			{
				date: new Date(),
				content: ["pass", "pass"],
				direction: DIRECTIONS.FORWARDS,
			},
		];
		expect(filterTermHistoryEntriesByDirection(history, DIRECTIONS.FORWARDS)).toEqual(
			history
		);

		expect(
			filterTermHistoryEntriesByDirection(history, DIRECTIONS.FORWARDS)
		).toHaveLength(2);
	});
});

describe("getLastReviewDateFromTerm", () => {
	const now = new Date();

	const term: Term = {
		listMembership: [],
		owner: "me",
		saturation: {
			forwards: 1,
			backwards: 1,
		},
		_id: "123",
		from: "English",
		to: "Japanese",
		history: [
			{
				content: ["pass", "pass"],
				date: now,
				direction: DIRECTIONS.FORWARDS,
			},
		],
	};

	test("... returns most recent forwards date if one forwards review in history", () => {
		expect(getLastReviewDateFromTerm(term)).toHaveProperty("forwards", now);
	});

	term.history.push({
		content: ["pass", "pass"],
		date: new Date(),
		direction: DIRECTIONS.BACKWARDS,
	});
	test("... returns most recent forwards and backwards date if one of both exists in history", () => {
		const result = getLastReviewDateFromTerm(term);
		expect(result).toHaveProperty("forwards", now);

		expect(result).toHaveProperty("backwards");
	});

	test("... returns most recent dates if two backwards reviews and one forwards review", () => {
		term.history.push({
			content: ["pass"],
			date: new Date("March 20, 2020"),
			direction: DIRECTIONS.BACKWARDS,
		});
		expect(getLastReviewDateFromTerm(term)).toStrictEqual({
			forwards: now,
			backwards: new Date("March 20, 2020"),
		});
	});

	test("... returns null for both directions if no reviews in history", () => {
		term.history = [];
		expect(getLastReviewDateFromTerm(term)).toStrictEqual({
			forwards: null,
			backwards: null,
		});
	});
});

describe("", () => {
	test("... returns array of length 1 if 1 only 1 session with given direction", () => {
		expect(
			termSessionsByDirection(mockTermWithHistory as Term, "forwards")
		).toHaveLength(1);
	});
});
