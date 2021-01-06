import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat'
  dayjs.extend(advancedFormat)
  dayjs.extend(relativeTime);

/**
 * @module time functions to compute, parse and format dates and times
 */

/**
 * Return time to or from the given date
 * @param {Date} date date to which relative distance should be returned
 * @returns {String} e.g. '2 days ago'
 */
export function timeSince(date) {
    return dayjs(date).fromNow();
}

/**
 * Converts a date to a formatted string
 * @param {Date} date Date to format
 * @param {String} format dayjs parse format
 */
export function formatDate(date, format) {
    return dayjs(date).format(format);
}