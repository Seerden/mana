import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat'
  dayjs.extend(advancedFormat)
  dayjs.extend(relativeTime);

/**
 * Return time to or from the given date
 * @returns {string} e.g. '2 days ago'
 */
export function timeSince(date: Date | null): string | null {
    if (date) {
        console.log(dayjs(date).fromNow());
        return dayjs(date).fromNow();
    }

    return null
}

/**
 * Converts a date to a formatted string
 * @param {string} format dayjs parse format
 */
export function formatDate(date: Date, format: string): string {  // @todo: figure out dayjs types
    return dayjs(date).format(format);
}