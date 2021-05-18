import { Term } from 'graphql/codegen-output';
import { atom, selector } from 'recoil';

type ReviewSettings = {
    direction: 'forwards' | 'backwards',
    n: number,
    sessionStart: Date | null,
    sessionEnd: Date | null,
    started: boolean,
    ended: boolean
};

type PassFail = Array<'pass' | 'fail'>;

type TimePerCard = Array<any> | Array<Date>;

type ReviewStage = 'before' | 'started' | 'after' | 'completed'


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

export const reviewStageState = atom<ReviewStage>({
    key: 'reviewStageState',
    default: 'before'
})


export const termsToReviewState = atom<Array<Term>>({
    key: 'termsToReviewState',
    default: [],
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
                            content: [] as PassFail,
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
    default: [] as PassFail
})

export const timePerCardState = atom<TimePerCard>({
    key: 'timePerCardState',
    default: new Array<TimePerCard>()
})