import { atom } from 'recoil';
import { ListInterface } from 'components/list/list.types';

export const selectingTermsToReviewState = atom({
    key: 'selectingTermsToReviewState',
    default: false
})

export const listState = atom({
    key: 'listState',
    default: {} as ListInterface
})