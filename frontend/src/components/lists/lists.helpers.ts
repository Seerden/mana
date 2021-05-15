import dayjs from 'dayjs';
import { ColorType } from './lists.types';

export function colorByLastReviewDate(reviewDate: Date | null): ColorType {
    let day = 3600 * 24 * 1000;

    if (reviewDate) {
        const now = new Date();
        const timeSince = dayjs(now).valueOf() - dayjs(reviewDate).valueOf();

        if (timeSince < day) {
            return 'seagreen';
        } else if (timeSince < 2 * day) {
            return 'teal';
        } else if (timeSince < 3 * day) {
            return 'yellowgreen';
        } else if (timeSince < 7 * day) {
            return 'orange';
        } else return 'orangered';
    } else {
        return '#333';
    }
}