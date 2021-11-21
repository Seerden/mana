import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

/**
 * Return time to or from the given date
 * @returns {string} e.g. '2 days ago'
 */
export function timeSince(date: Date | null): string | null {
	return date ? dayjs(date).fromNow() : null;
}

/**
 * Converts a date to a formatted string
 * @param {string} format dayjs parse format
 */
export function formatDate(date: Date, format: string): string {
	// @todo: figure out dayjs types
	return dayjs(date).format(format);
}

export type Timescale = "minutes" | "hours" | "seconds";

export function dateDifference(date1: Date, date2: Date, timescale: Timescale) {
	return dayjs(date1).diff(dayjs(date2), timescale);
}

export const humanizedDateDifference = (date1: Date, date2: Date) =>
	dayjs.duration(dayjs(date1).diff(date2)).humanize();
