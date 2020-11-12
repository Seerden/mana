import { atom } from 'recoil';

export const reviewSettingsState = atom({
    key: 'reviewSettingsState',
    default: {
        direction: 'forwards',
        n: 2,
        started: false,
    }
})