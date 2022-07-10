import dayjs from "dayjs";
import { dateDifference, humanizedDateDifference, timeSince } from "./time";

const now = new Date();
const march = new Date("March 20, 2020");

describe("dayjs", () => {
	test("converts now to dayjs object", () => {
		expect(dayjs(new Date())).toBeDefined();
	});

	test("calculates diff between two dates properly", () => {
		expect(
			dayjs(now).diff(dayjs(new Date("March 21, 2020")), "minutes")
		).toBeGreaterThan(0);
	});
});

describe("dateDifference", () => {
	test("... calculates positive difference in minutes properly", () => {
		expect(dateDifference(now, march, "minutes")).toBeGreaterThan(0);
	});

	test("... calculates negative difference properly", () => {
		expect(dateDifference(march, now, "minutes")).toBeLessThan(0);
	});

	test("... returns 0 if two supplied dates are equal", () => {
		expect(dateDifference(now, now, "minutes")).toBe(0);
	});
});

describe("timeSince", () => {
	test("... returns null if null date supplied", () => {
		expect(timeSince(null)).toBeNull();
	});

	test("... returns 'an hour ago' if supplied date is an hour ago", () => {
		const now = Date.now();
		const anHourAgo = new Date(now - 3600 * 1000);
		expect(timeSince(anHourAgo)).toBe("an hour ago");
	});

	test("... returns 'a few seconds ago' if supplied date is now", () => {
		const now = new Date();
		expect(timeSince(now)).toBe("a few seconds ago");
	});

	test("... returns 'in an hour' if supplied date is an hour from now", () => {
		const now = Date.now();
		const hourFromNow = new Date(now + 3600 * 1000);

		expect(timeSince(hourFromNow)).toBe("in an hour");
	});
});

describe("humanizedDateDifference", () => {
	test("... returns 'a day' if 24 hours between two supplied dates", () => {
		const date1 = new Date();
		const date2 = new Date(Date.now() - 24 * 3600 * 1000);
		expect(humanizedDateDifference(date1, date2)).toBe("a day");
	});

	test("... returns 'a few seconds' if a few seconds between two supplied dates", () => {
		expect(humanizedDateDifference(new Date(), new Date(Date.now() - 1000 * 2))).toBe(
			"a few seconds"
		);
	});
});
