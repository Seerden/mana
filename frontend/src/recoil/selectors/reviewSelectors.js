import { selector } from 'recoil'
import { termsToReviewState, reviewSettingsState } from '../atoms/reviewAtoms';

export const numTermsToReviewState = selector({
    key: 'numTermsToReviewState',
    get: ({ get }) => get(termsToReviewState).length

})