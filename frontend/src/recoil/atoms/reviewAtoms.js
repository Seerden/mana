import { atom } from 'recoil';

export const reviewSettingsState = atom({
    key: 'reviewSettingsState',
    default: {
        direction: 'forwards',
        n: 2,
        started: false,
    }
});

export const termsToReviewState = atom({
    key: 'termsToReviewState',
    default: [],
    effects_UNSTABLE: [
        ({onSet}) => {
          onSet((newState) => console.log(newState));
        },
      ],
})