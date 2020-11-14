import { selector } from 'recoil'
import { termsToReviewState, reviewSettingsState } from '../atoms/reviewAtoms';

export const numTermsToReviewState = selector({
    key: 'numTermsToReviewState',
    get: ({ get }) => get(termsToReviewState).length

})

export const initialNewHistoryEntriesState = selector({
    key: 'initialNewHistoryEntriesState',
    get: ({ get }) => {
        console.log('setting initialNewHistoryEntriesState');
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
    },
})

