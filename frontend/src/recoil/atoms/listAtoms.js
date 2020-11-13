import { atom } from 'recoil';

export const selectingTermsToReviewState = atom({
    key: 'selectingTermsToReviewState',
    default: false
})

export const listState = atom({
    key: 'listState',
    default: {}
})