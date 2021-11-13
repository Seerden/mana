import { useMemo, useEffect, useReducer, useCallback, useState } from "react";
import {
	useRecoilValue,
	useRecoilState,
	useResetRecoilState,
	useSetRecoilState,
} from "recoil";
import { makeReviewList } from "helpers/reviewHelpers";
import qs from "query-string";
import {
	timePerCardState,
	passfailState,
	reviewSettingsState,
	termsToReviewState,
	termUpdateArrayState,
	reviewStageState,
} from "state/atoms/reviewAtoms";
import { numTermsToReviewState } from "state/selectors/reviewSelectors";
import { useRouteProps } from "../routerHooks";
import useReviewSession from "./useReviewSession";
import { makeNewSaturationLevels } from "helpers/srs/saturation";
import { Term, TermUpdateObject } from "gql/codegen-output";
import { useCreateReviewSessionMutation } from "gql/hooks/reviewSession.query";
import { useQueryListsById } from "gql/hooks/list.query";
import {
	TermUpdateDate,
	TermUpdatePassfail,
	TermUpdateSaturation,
} from "../../types/useReview.types";
import ReviewCard from "components/review/ReviewCard/ReviewCard";

export function useReview() {
	const { params, location } = useRouteProps();
	const [backWasShown, setBackWasShown] = useState(false);
	const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
	const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
	const setReviewStage = useSetRecoilState(reviewStageState);
	const setPassfail = useSetRecoilState(passfailState);

    useEffect(() => {
        console.log(termsToReview);
    }, [termsToReview])

	const initializeFutureTerms = useCallback(() => {
		return makeReviewList(termsToReview, reviewSettings.n);
	}, [reviewSettings.n, termsToReview]);

	const [futureTerms, reduceFutureTerms] = useReducer(termReducer, () =>
		initializeFutureTerms()
	);

	const makeReviewCard = useCallback(
		(term: Term) => {
			return (
				<ReviewCard
					direction={reviewSettings.direction}
					term={term}
					setBackWasShown={setBackWasShown}
				/>
			);
		},
		[reviewSettings.direction]
	);

	const numTermsToReview = useRecoilValue(numTermsToReviewState);
	const setTimePerCard = useSetRecoilState(timePerCardState);
	const resetTermsToReview = useResetRecoilState(termsToReviewState);
	const newReviewSession = useReviewSession();
	const [termUpdateArray, setTermUpdateArray] = useRecoilState(termUpdateArrayState);
	const { mutate: mutateCreateReviewSession, data: mutateResponse } =
		useCreateReviewSessionMutation();
	const { data: lists, refetch: refetchLists } = useQueryListsById([params.id]);
	const isFullListReview =
		qs.parse(location.search).kind === "full" && location.pathname.includes("list");

	useEffect(() => {
		location.pathname.includes("list") && refetchLists();

		return () => resetTermsToReview();
	}, []);

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
		lists && isFullListReview && setTermsToReview(lists[0].terms);
	}, [lists]);

	useEffect(() => {
		termsToReview && reduceFutureTerms({ type: "init" });
	}, [termsToReview]);

	useEffect(() => {
		// whenever backWasShown changes, remake LeftArrow/RightArrow keydown handler
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
	}, [futureTerms]);

	/** case pass/fail:  Handle what happens to current term after pass/fail is chosen. */
	function termReducer(terms, { type }: { type: PassFail | "init" }) {
		switch (type) {
			case "init":
				return initializeFutureTerms();
			case "pass":
				return terms.slice(1);
			case "fail":
				const newIndex = Math.floor((terms.length + 1) * Math.random());
				let newTerms = [...terms];
				let currentTerm = newTerms.shift();
				if (currentTerm) {
					newTerms.splice(newIndex, 0, currentTerm);
					return newTerms;
				}
				return terms;
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
		// @note: an actual reducer would have 'state' as first parameter here.
		switch (action.type) {
			case "passfail":
				const { passfail, currentTerm } = action;
				setTermUpdateArray((cur) =>
					cur.map((term) => {
						if (term._id === currentTerm._id) {
							return {
								...term,
								history: {
									...term.history,
									content: [...term.history!.content, passfail],
								},
							} as TermUpdateObject; // if we don't alias the return, it'll think the date doesn't exist
						}
						return term;
					})
				);
				break;
			case "saturation":
				const { newSaturationLevels } = action;
				setTermUpdateArray((cur) =>
					cur.map((termToUpdate, index) => {
						return {
							...termToUpdate,
							saturation:
								newSaturationLevels[index].termId === termToUpdate._id
									? newSaturationLevels[index].saturation
									: termToUpdate.saturation,
						};
					})
				);
				break;
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

	const { completedCount, progress } = useMemo(() => {
		let completedCount: number = 0;
		let progress: number = 0;

		if (futureTerms) {
			const sessionLength = numTermsToReview * reviewSettings.n;
			const termsCompleted = sessionLength - futureTerms.length;

			progress = Math.floor((100 * termsCompleted) / sessionLength);
			completedCount = sessionLength - futureTerms.length;
		}

		return { completedCount, progress };
	}, [futureTerms, numTermsToReview, reviewSettings.n]);

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

	/** ArrowLeft/ArrowRight keydown event to simulate pressing the Pass/Fail buttons */
	function handleLeftRightArrowKeyDown(e: KeyboardEvent) {
		let passfail: PassFail;

		if (["ArrowLeft", "ArrowRight"].includes(e.code)) {
			switch (e.code) {
				case "ArrowLeft":
					passfail = "fail";
					break;
				case "ArrowRight":
					passfail = "pass";
					break;
				default:
					return;
			}
		} else return;

		backWasShown && passfail && handlePassFailClick(null, passfail);
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
