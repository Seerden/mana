import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

/**
 * Print string with time to/from date
 * @param {Date} date 
 * @returns {String} string, e.g. '2 days ago'
 */
export const timeSince = date => dayjs(date).fromNow();

export const formatDate = (date, format) => dayjs(date).format(format)