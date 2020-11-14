import { atom, atomFamily, selector } from 'recoil';
import { initialNewHistoryEntriesState } from '../selectors/reviewSelectors';

export const reviewSettingsState = atom({
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

export const termsToReviewState = atom({
    key: 'termsToReviewState',
    default: [],
    effects_UNSTABLE: [
        ({onSet}) => {
          onSet((newState) => console.log('termsToReview was updated:', newState));
        },
      ],
})

export const newHistoryEntriesState = atom({
    key: 'newTermHistoriesState',
    default: selector({
        key: 'newTermHistoriesState/default',
        get: ({get}) => {
            const reviewSettings = get(reviewSettingsState);
            const termsToReview = get(termsToReviewState);
            return termsToReview.map(t => {
                return ({
                    termId: t._id,
                    newHistoryEntry: {
                        date: reviewSettings.sessionStart,
                        content: [],
                        direction: reviewSettings.direction
                    }
                })
            })
        }
    })
})