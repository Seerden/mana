import dayjs from 'dayjs';
import { List } from 'graphql/codegen-output';
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
};

/** Return the most recent date from list.reviewDates, by comparing the last entry from .forwards to .backwards */
export function getLastReviewDate(list: List) {
    const { forwards, backwards } = list.reviewDates;
    const last = (arr: Date[] | []) => arr && arr[arr.length-1];
    const [lastForwards, lastBackwards] = [last(forwards), last(backwards)];

    if (!lastForwards) {
        if (lastBackwards) {
            return lastBackwards
        };
        return null;
    }

    if (!lastBackwards) {
        return lastForwards
    }

    return lastForwards > lastBackwards ? lastForwards : lastBackwards;
}