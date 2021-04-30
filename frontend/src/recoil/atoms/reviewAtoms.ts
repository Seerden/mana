import { atom, atomFamily, AtomOptions, selector } from 'recoil';
import { TermElementInterface } from 'components/list/list.types';

type ReviewSettings = {
    direction: 'forwards' | 'backwards',
    n: number,
    sessionStart: Date | null,
    sessionEnd: Date | null,
    started: boolean,
    ended: boolean
};

type PassFail = [] | Array<'pass' | 'fail'>;

type TimePerCard = [] | Date[]


export const reviewSettingsState = atom<ReviewSettings>({
    key: 'reviewSettingsState',
    default: {
        direction: 'forwards',
        n: 2,
        sessionStart: null,
        sessionEnd: null,
        started: false,
        ended: false,
    }
});

export const reviewStageState = atom({
    key: 'reviewStageState',
    default: 'before'
})


export const termsToReviewState = atom<TermElementInterface[] | any[]>({
    key: 'termsToReviewState',
    default: [] as TermElementInterface[],
})

export const newHistoryEntriesState = atom({
    key: 'newTermHistoriesState',
    default: selector({
        key: 'newTermHistoriesState/default',
        get: ({ get }) => {
            const reviewSettings = get(reviewSettingsState);
            const termsToReview = get(termsToReviewState);
            if (termsToReview) {
                return termsToReview.map(t => {
                    return ({
                        termId: t._id,
                        newHistoryEntry: {
                            date: reviewSettings.sessionStart,
                            content: new Array(),
                            direction: reviewSettings.direction
                        }
                    })
                })
            } else {
                return []
            }
        }
    })
})

export const passfailState = atom<PassFail>({
    key: 'passfailState',
    default: []
})

export const timePerCardState = atom<TimePerCard>({
    key: 'timePerCardState',
    default: []
})