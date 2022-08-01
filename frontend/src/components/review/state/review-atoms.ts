import { Term, TermHistoryInput, TermUpdateObject } from "gql/codegen-output";
import { atom, selector } from "recoil";

type ReviewSettings = {
	direction: "forwards" | "backwards";
	n: number;
	sessionStart: Date | null;
	sessionEnd: Date | null;
	started: boolean;
	ended: boolean;
};

type PassFailArray = Array<"pass" | "fail">;

type TimePerCard = Array<any> | Array<Date>;

type ReviewStage = "before" | "started" | "after";

export const reviewSettingsState = atom<ReviewSettings>({
	key: "reviewSettingsState",
	default: {
		direction: "forwards",
		n: 2,
		sessionStart: null,
		sessionEnd: null,
		started: false,
		ended: false,
	},
});

export const reviewStageState = atom<ReviewStage>({
	key: "reviewStageState",
	default: "before",
});

export const termsToReviewState = atom<Array<Term>>({
	key: "termsToReviewState",
	default: [] as Term[],
});

const makeDefaultTermUpdateArray = (
	terms: Term[],
	settings: ReviewSettings
): TermUpdateObject[] => {
	return terms.map((term) => ({
		_id: term._id,
		history: {
			content: [] as PassFailArray,
			direction: settings.direction,
			date: null,
		} as TermHistoryInput,
		saturation: term.saturation,
	}));
};

export const termUpdateArrayState = atom<TermUpdateObject[]>({
	key: "termUpdateArrayState",
	default: selector({
		key: "termUpdateArrayState/default",
		get: ({ get }) => {
			const reviewSettings = get(reviewSettingsState);
			const termsToReview = get(termsToReviewState);
			return makeDefaultTermUpdateArray(termsToReview, reviewSettings);
		},
	}),
});

export const newHistoryEntriesState = atom({
	key: "newTermHistoriesState",
	default: selector({
		key: "newTermHistoriesState/default",
		get: ({ get }) => {
			const reviewSettings = get(reviewSettingsState);
			const termsToReview = get(termsToReviewState);
			if (termsToReview) {
				return termsToReview.map((t) => {
					return {
						termId: t._id,
						newHistoryEntry: {
							date: reviewSettings.sessionStart,
							content: [] as PassFailArray,
							direction: reviewSettings.direction,
						},
					};
				});
			} else {
				return [];
			}
		},
	}),
});

export const passfailState = atom<PassFailArray>({
	key: "passfailState",
	default: [] as PassFailArray,
});

export const timePerCardState = atom<TimePerCard>({
	key: "timePerCardState",
	default: new Array<TimePerCard>(),
});
