import { atom } from 'recoil';

export const selectingTermsToReviewState = atom<boolean>({
    key: 'selectingTermsToReviewState',
    default: false
})

export const listState = atom({
    key: 'listState',
    default: {} as Partial<List>
})