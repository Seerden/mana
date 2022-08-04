import { ReviewSessionEntryInput } from "../../../gql/codegen-output";
import { SessionEntryWithoutTimeOnCard } from "../types/review.types";
import { entriesWithTimeOnCard, shuffleArray, shuffleRepeatedly } from "./review-helpers";

describe("shuffleArray", () => {
	const list = [1, 2, 3];

	describe("returns input if input has length 1", () => {
		test("many results are equal", () => {
			const list = [1];
			const results = [];
			for (const entry of [...Array(1e4)]) {
				const result = shuffleArray(list);
				results.push(result);
			}

			expect(new Set(results.map((x) => JSON.stringify(x)))).toEqual(
				new Set([JSON.stringify(list)])
			);
		});

		test("complex list is equal to result", () => {
			const complexList = [{ a: { b: 1 } }];
			const complexResult = shuffleArray(complexList);
			expect(complexResult).toStrictEqual(complexList);
		});
	});

	test("returns an array of same length", () => {
		const result = shuffleArray(list);
		expect(result).toHaveLength(list.length);
	});

	test("actually shuffles the list", () => {
		const results = [];

		let i = 0;
		while (i < 1e4) {
			const result = shuffleArray(list);
			results.push(result);
			i++;
		}

		expect(
			// Some, but not every, result has to be equal.
			// NOTE: it's technically possible that one of the
			results.some((result) => JSON.stringify(result) !== JSON.stringify(list)) &&
				!results.every((result) => JSON.stringify(result) !== JSON.stringify(list))
		);
	});

	describe("contains each element of the original array exactly once", () => {
		test("contains each primitive entry exactly once", () => {
			const result = shuffleArray(list);

			for (const entry of list) {
				const stringifiedEntry = JSON.stringify(entry);
				expect(
					result.filter((x) => JSON.stringify(x) === stringifiedEntry)
				).toHaveLength(1);
			}
		});

		test("contains each complex entry exactly once", () => {
			const complexList = [
				{
					a: 1,
					b: 2,
				},
				{
					c: 3,
					d: 4,
				},
			];

			const result = shuffleArray(complexList);

			for (const entry of complexList) {
				const stringifiedEntry = JSON.stringify(entry);
				expect(
					result.filter((x) => JSON.stringify(x) === stringifiedEntry)
				).toHaveLength(1);
			}
		});
	});
});

describe("shuffleRepeatedly", () => {
	const list = [1, 2, { a: { b: new Date() } }];
	const n = 12;
	const result = shuffleRepeatedly(list, 12);

	test("returns array of length `n` * array.length", () => {
		expect(result).toHaveLength(n * list.length);
	});

	test("contains each entry `n` times", () => {
		for (const entry of result) {
			expect(
				result.filter((x) => JSON.stringify(x) === JSON.stringify(entry))
			).toHaveLength(n);
		}
	});
});

describe("entriesWithTimeOnCard", () => {
	// Could complicate this test, but just using a mock object is probably good enough.
	const expected: ReviewSessionEntryInput[] = [
		{
			created_at: 1,
			direction: "forwards",
			passfail: "pass",
			term_id: 1,
			time_on_card: 1,
		},
		{
			created_at: 3,
			direction: "forwards",
			passfail: "pass",
			term_id: 1,
			time_on_card: 2,
		},
	];

	const entries: SessionEntryWithoutTimeOnCard[] = [
		{
			created_at: 1,
			direction: "forwards",
			passfail: "pass",
			term_id: 1,
		},
		{
			created_at: 3,
			direction: "forwards",
			passfail: "pass",
			term_id: 1,
		},
	];

	const result = entriesWithTimeOnCard(0, entries);
	expect(result).toStrictEqual(expected);
});
