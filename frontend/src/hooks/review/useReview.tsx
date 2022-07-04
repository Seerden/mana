import { TermUpdateObject } from "gql/codegen-output";
import { useCreateReviewSessionMutation } from "gql/hooks/reviewSession-query";
import { makeReviewList } from "helpers/review-helpers";
import { makeNewSaturationLevels } from "helpers/srs/saturation";
import { useCallback, useEffect, useMemo, useReducer } from "react";
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

	const initializeFutureTerms = useCallback(() => {
		return makeReviewList(termsToReview, reviewSettings.n);
	}, [reviewSettings.n, termsToReview]);

	const [futureTerms, reduceFutureTerms] = useReducer(termReducer, () =>
		initializeFutureTerms()
	);

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
		termsToReview && reduceFutureTerms({ type: "init" });
	}, [termsToReview]);

	useEffect(() => {
		window.addEventListener("keydown", handleLeftRightArrowKeyDown);
		return () => {
			window.removeEventListener("keydown", handleLeftRightArrowKeyDown);
		};
	}, [backWasShown]);

	useEffect(() => {
		// end review session once futureTerms.length reaches 0
		if (termsToReview.length > 0 && futureTerms?.length === 0) {
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
	}, [futureTerms, termsToReview]);

	/** case pass/fail:  Handle what happens to current term after pass/fail is chosen. */
	function termReducer(terms, { type }: { type: PassFail | "init" }) {
		switch (type) {
			case "init":
				return initializeFutureTerms();
			case "pass":
				return terms.slice(1);
			case "fail": {
				const newIndex = Math.floor((terms.length + 1) * Math.random());
				const newTerms = [...terms];
				const currentTerm = newTerms.shift();
				if (currentTerm) {
					newTerms.splice(newIndex, 0, currentTerm);
					return newTerms;
				}
				return terms;
			}
			default:
				return terms;
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
	const [completedCount, progress] = useMemo(() => {
		if (!futureTerms) return [0, 0];
		const termsCompleted = sessionLength - futureTerms.length;
		const progress = Math.floor((100 * termsCompleted) / sessionLength);
		const completedCount = sessionLength - futureTerms.length;
		return [completedCount, progress];
	}, [futureTerms, sessionLength]);

	/** Handle clicking the pass or fail button */
	const handlePassFailClick = useCallback(
		(e, passfail: PassFail) => {
			reduceTermUpdateArray({
				type: "passfail",
				currentTerm: futureTerms[0],
				passfail,
			});
			setPassfail((cur) => [...cur, passfail]);
			setTimePerCard((cur) => [...cur, new Date()]);
			reduceFutureTerms({ type: passfail });
			setBackWasShown(false);
		},
		[futureTerms, backWasShown]
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
		futureTerms,
		reduceFutureTerms,
		progress,
		completedCount,
		handlePassFailClick,
		makeReviewCard,
	};
}
