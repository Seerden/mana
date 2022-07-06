import { TermUpdateObject } from "gql/codegen-output";
import { useCreateReviewSessionMutation } from "gql/hooks/reviewSession-query";
import { makeReviewList } from "helpers/review-helpers";
import { makeNewSaturationLevels } from "helpers/srs/saturation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	TermUpdateDate,
	TermUpdatePassfail,
	TermUpdateSaturation,
} from "../../types/useReview.types";
import { useInitializeReview } from "./useInitializeReview";
import { useMakeReviewCard } from "./useMakeReviewCard";
import { useReviewState } from "./useReviewState";

const mapKeyCodeToPassFail = {
	ArrowLeft: "fail",
	ArrowRight: "pass",
};

export function useReview() {
	useInitializeReview();
	const { makeReviewCard, backWasShown, setBackWasShown } = useMakeReviewCard();
	const {
		reviewSettings,
		setReviewSettings,
		termsToReview,
		setReviewStage,
		setPassfail,
		setTimePerCard,
		termUpdateArray,
		setTermUpdateArray,
		newReviewSession,
	} = useReviewState();

	const { mutate: mutateCreateReviewSession, data: mutateResponse } =
		useCreateReviewSessionMutation();

	const initialTerms = useMemo(() => {
		return makeReviewList(termsToReview, reviewSettings.n);
	}, [termsToReview, reviewSettings.n]);

	const [remainingTerms, setRemainingTerms] = useState(initialTerms);

	// Need this since termsToReview might be empty (since useInitialReview may
	// not be done fetching and parsing lists->termsToReviewyet).
	useEffect(() => {
		setRemainingTerms(initialTerms);
	}, [termsToReview, reviewSettings.n]);

	useEffect(() => {
		if (reviewSettings.sessionEnd) {
			if (!mutateResponse) {
				mutateCreateReviewSession({ newReviewSession, termUpdateArray });
			} else {
				setReviewStage("after");
			}
		}
	}, [mutateResponse, reviewSettings.sessionEnd]);

	/** 'reducer' to update value of termUpdateArray
	 *  note that this doesn't actually function as a reducer, since termUpdateArray is recoil atom state, and not React useState
	 *  @todo: look into the possibility of implementing this as a selector
	 */
	function reduceTermUpdateArray(
		action: TermUpdatePassfail | TermUpdateSaturation | TermUpdateDate
	) {
		switch (action.type) {
			/*
             Takes termUpdateArray and maps the entire thing. 
             For each term in termUpdateArray:
                 - check if term._id === currentTerm._id
                     - if false: return term as is
                     - else:
                         - make a copy of term,
                         - update copy.history.content
                         - return the copy
             
             Very sloppy implementation, performance-wise and readability-wise. We're recreating the entire array every time 
             this function is called. Instead, we should just keep an array of { termId, passFail } throughout the review,
             and derive the final termUpdateObject from this array only once, when the entire review has been completed

         */
			case "passfail": {
				const { passfail, currentTerm } = action;
				setTermUpdateArray((cur) =>
					cur.map((term) => {
						if (term._id === currentTerm._id) {
							return {
								...term,
								history: {
									...term.history,
									content: [...term.history?.content, passfail],
								},
							} as TermUpdateObject; // if we don't alias the return, it'll think the date doesn't exist
						}
						return term;
					})
				);
				break;
			}

			/*
             @todo: Unlike case "passfail", we only end up calling this case once per review, so performance is fine.
             However, this should really be extracted to a function that's more apparent in what it actually does
         */
			case "saturation": {
				const { newSaturationLevels } = action;
				setTermUpdateArray((cur) =>
					cur.map((term, index) => {
						return {
							...term,
							saturation:
								newSaturationLevels[index].termId === term._id
									? newSaturationLevels[index].saturation
									: term.saturation,
						};
					})
				);
				break;
			}
			case "date":
				setTermUpdateArray((cur) =>
					cur.map(
						(entry) =>
							({
								...entry,
								history: {
									...entry.history,
									date: new Date(),
								},
							} as TermUpdateObject)
					)
				);
				break;
		}
	}

	/**
	 * Update all necessary state to move on to the next ReviewCard. This
	 * function can either be called through a keydown event handler, or manually
	 * if passed `passfail`. As such, this either takes `e` _or_ `passfail`
	 */
	const handlePassFail = useCallback(
		({ e, passfail }: { e?: KeyboardEvent; passfail?: PassFail }) => {
			if (!backWasShown) return;

			if ((e && passfail) || (!e?.code && !passfail)) {
				// Unhandled case, we expect exactly one of `e` and `passfail`
				return;
			}

			const passOrFail = passfail ?? mapKeyCodeToPassFail[e.code];

			reduceTermUpdateArray({
				type: "passfail",
				currentTerm: remainingTerms[0],
				passfail: passOrFail,
			});

			setPassfail((cur) => cur.concat(passOrFail));
			setTimePerCard((cur) => cur.concat(new Date()));
			updateRemainingTerms({ passfail: passOrFail });
			setBackWasShown(false);
		},
		[remainingTerms, backWasShown]
	);

	useEffect(() => {
		window.addEventListener("keydown", (e) => handlePassFail({ e }));
		return () => {
			window.removeEventListener("keydown", (e) => handlePassFail({ e }));
		};
	}, []);

	useEffect(() => {
		// end review session once futureTerms.length reaches 0
		if (termsToReview.length && remainingTerms?.length === 0) {
			const newSaturationLevels = makeNewSaturationLevels(
				termsToReview,
				termUpdateArray,
				reviewSettings
			);

			reduceTermUpdateArray({ type: "saturation", newSaturationLevels });

			reduceTermUpdateArray({ type: "date" });

			setReviewSettings((current) => ({
				...current,
				sessionEnd: new Date(),
			}));
		}
		/* 
         Deps array doesn't take reviewSettings, even though that piece of state
         _is_  used in makeNewSaturationLevels, this is a code smell. Simple
         naive fix would  be to turn makeNewSaturationLevels into a callback
         that has reviewSettings as one of its dependencies, instead of passing
         reviewSettings as an argument.
        */
	}, [remainingTerms, termsToReview]);

	// Shuffle the first term back into the array at a random spot. If it's the
	// only remaining card, return (a copy of) the array as it is.
	function shuffleCurrentTerm(terms: any[]) {
		if (terms.length === 1) {
			return terms.slice();
		}

		const newIndex = Math.floor((terms.length + 1) * Math.random());
		const termsCopy = terms.slice();
		const currentTerm = termsCopy.shift();
		termsCopy.splice(newIndex, 0, currentTerm);

		return termsCopy;
	}

	// Remove or re-shuffle the first entry of remainingTerms depending on
	// `passfail`. Intended only to be triggered on user interaction with a
	// ReviewCard.
	function updateRemainingTerms({ passfail }: { passfail: PassFail }) {
		// If 'pass', then the card can be removed from the deck.
		if (passfail === "pass") {
			setRemainingTerms((current) => current.slice(1));
		}

		// If 'fail', the card has to be re-placed in the deck at a random index.
		if (passfail === "fail") {
			setRemainingTerms((current) => shuffleCurrentTerm(current));
		}
	}

	// Session progress state derived from other pieces of state.
	const completion = useMemo(() => {
		if (!remainingTerms)
			return {
				count: 0,
				percentage: 0,
			};

		// Total number of flashcards in the review session.
		const sessionLength = termsToReview.length * reviewSettings.n;

		const completedCount = sessionLength - remainingTerms.length;
		const progress = Math.floor((100 * completedCount) / sessionLength);

		return {
			count: completedCount,
			percentage: progress,
		};
	}, [remainingTerms, termsToReview.length, reviewSettings.n]);

	return {
		backWasShown,
		setBackWasShown,
		remainingTerms,
		completion,
		handlePassFail,
		makeReviewCard,
	} as const;
}
