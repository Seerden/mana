import { selector } from 'recoil'
import { termsToReviewState } from '../atoms/reviewAtoms';

export const numTermsToReviewState = selector({
    key: 'numTermsToReviewState',
    get: ({get}) => get(termsToReviewState).length

})

