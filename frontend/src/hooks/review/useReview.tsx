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

	const initialTerms = useMemo(() => {
		return makeReviewList(termsToReview, reviewSettings.n);
	}, [termsToReview, reviewSettings.n]);

	const [remainingTerms, setRemainingTerms] = useState(initialTerms);

	// termsToReview might be empty on initial mount, since useInitivalReview may
	// not have grabbed the terms and parsed them into termsToReview yet. Hence
	// this effect is strictly necessary.
	useEffect(() => {
		setRemainingTerms(initialTerms);
	}, [termsToReview, reviewSettings.n]);

	const { mutate: mutateCreateReviewSession, data: mutateResponse } =
		useCreateReviewSessionMutation();

	useEffect(() => {
		if (reviewSettings.sessionEnd) {
			if (!mutateResponse) {
				mutateCreateReviewSession({ newReviewSession, termUpdateArray });
			} else {
				setReviewStage("after");
			}
		}
	}, [mutateResponse, reviewSettings.sessionEnd]);

	useEffect(() => {
		window.addEventListener("keydown", handleLeftRightArrowKeyDown);
		return () => {
			window.removeEventListener("keydown", handleLeftRightArrowKeyDown);
		};
	}, [backWasShown]);

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
            deps array doesn't take reviewSettings, even though that piece of state _is_ used in makeNewSaturationLevels,
            this is a code smell. Simple naive fix would be to turn makeNewSaturationLevels into a callback that has reviewSettings
            as one of its dependencies, instead of passing reviewSettings as an argument
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

	// This function either removes or re-shuffles the first entry of
	// remainingTerms depending on `passfail`. Intended only to be triggered on
	// user interaction with a ReviewCard.
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

	// total number of flashcards in the entire review session
	const sessionLength = useMemo(() => {
		return termsToReview.length * reviewSettings.n;
	}, [termsToReview, reviewSettings.n]);

	// number of seen flashcards, and session progress as a percentage
	const completion = useMemo(() => {
		if (!remainingTerms)
			return {
				count: 0,
				percentage: 0,
			};

		const completedCount = sessionLength - remainingTerms.length;
		const progress = Math.floor((100 * completedCount) / sessionLength);

		return {
			count: completedCount,
			percentage: progress,
		};
	}, [remainingTerms, sessionLength]);

	/** Handle clicking the pass or fail button */
	const handlePassFailClick = useCallback(
		(e, passfail: PassFail) => {
			reduceTermUpdateArray({
				type: "passfail",
				currentTerm: remainingTerms[0],
				passfail,
			});
			setPassfail((cur) => [...cur, passfail]);
			setTimePerCard((cur) => [...cur, new Date()]);
			updateRemainingTerms({ passfail });
			setBackWasShown(false);
		},
		[remainingTerms, backWasShown]
	);

	/**
	 * To move to the next flashcard, the user can either
	 *  - press one of the "PASS"/"FAIL" buttons,
	 *  - press the left or right arrow key on their keyboard.
	 * This function creates a keydown handler that executes handlePassFailClick
	 * if the user just pressed either the left or right arrow keys
	 */
	function handleLeftRightArrowKeyDown(e: KeyboardEvent): void {
		if (!backWasShown) return;

		const mapKeyCodeToPassFail = {
			ArrowLeft: "fail",
			ArrowRight: "pass",
		};

		const passfail = mapKeyCodeToPassFail[e.code];

		if (passfail) {
			handlePassFailClick(null, passfail);
		}
	}

	return {
		backWasShown,
		setBackWasShown,
		remainingTerms,
		completion,
		handlePassFailClick,
		makeReviewCard,
	} as const;
}
