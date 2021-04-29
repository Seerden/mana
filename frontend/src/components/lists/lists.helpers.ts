import dayjs from 'dayjs';
import { ColorType } from './lists.types';

export function colorByLastReviewDate(timeSince: number | null): ColorType {
    let day = 3600 * 24 * 1000;
    if (!timeSince) {
        return '#333';
    } if (timeSince < day) {
        return 'seagreen';
    } if (timeSince < 2 * day) {
        return 'teal';
    } if (timeSince < 3 * day) {
        return 'yellowgreen';
    } if (timeSince < 7 * day) {
        return 'orange';
    }
    return 'orangered';
}

export function getTimeSinceLastReview(list) {
    if (!list?.lastReviewed) { return null; }

    return dayjs(new Date()).valueOf() - dayjs(list?.lastReviewed).valueOf();
}