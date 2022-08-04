import { useCallback, useEffect, useMemo, useState } from "react";
import { ReviewSessionWithoutUserIdInput, Term } from "../../../gql/codegen-output";
import useCreateReviewSession from "../../../gql/hooks/review-session/useCreateReviewSession";
import { entriesWithTimeOnCard, shuffleFirstEntry } from "../helpers/review-helpers";
import { SessionEntryWithoutTimeOnCard } from "../types/review.types";
import { useReviewState } from "./useReviewState";

const mapKeyCodeToPassFail: { [k: string]: PassFail } = {
	ArrowLeft: "fail",
	ArrowRight: "pass",
};

type UseReviewOptions = {
	cardTerms: Term[];
};

export function useReview({ cardTerms }: UseReviewOptions) {
	const {
		reviewSession,
		reviewEntries,
		setReviewEntries,
		setReviewStage,
		backWasShown,
		setBackWasShown,
	} = useReviewState();

	const { mutate: mutateCreateReviewSession } = useCreateReviewSession();

	/* TODO: 
      
      Currently, we get cardTerms from props and use that as initial state for
      remainingTerms.

      Another option is to make cardTerms (maybe rename the variable) a piece of
      global state, then we don't have to pass it around or work with
      cardTerms+remainingTerms (I don't like intermediate state).
   */
	const [remainingTerms, setRemainingTerms] = useState(cardTerms);

	useEffect(() => {}, [remainingTerms]);

	/**
	 * Update all necessary state to move on to the next ReviewCard. This
	 * function can either be called through a keydown event handler, or manually
	 * if passed `passfail`. As such, this either takes `e` _or_ `passfail`.
	 */
	const handlePassFail = useCallback(
		({ e, passfail }: { e?: KeyboardEvent; passfail?: PassFail }) => {
			if (!backWasShown) return; // Don't allow moving on until the user has at least seen the back.

			if ((e && passfail) || (!e?.code && !passfail)) return; // Unhandled case, we expect exactly one of `e` and `passfail`

			const passOrFail: PassFail = passfail ?? mapKeyCodeToPassFail[e.code];

			const currentTerm = remainingTerms[0];

			// NOTE: If the session ends (see next if block, then make sure to also
			// include this final `newEntry` in the mutation 'entries' argument)
			const newEntry: SessionEntryWithoutTimeOnCard = {
				term_id: currentTerm.term_id,
				direction: reviewSession.direction,
				passfail: passOrFail,
				created_at: new Date().valueOf(),
			};

			setReviewEntries((current) => [...current, newEntry]);

			// If there's only 1 remainingTerm and the user just 'passed', the
			// session is done. Send the mutation.
			if (remainingTerms.length === 1 && passOrFail === "pass") {
				const reviewSessionWithEndDate: Partial<ReviewSessionWithoutUserIdInput> = {
					...reviewSession,
					end_date: new Date().valueOf(),
				};

				// TODO: typeguard/validate session and entries to non-Partial types.
				const mutateArgs = {
					session:
						reviewSessionWithEndDate /* wip */ as ReviewSessionWithoutUserIdInput,
					entries: entriesWithTimeOnCard(
						reviewSession.start_date,
						reviewEntries.concat(newEntry) as SessionEntryWithoutTimeOnCard[]
					),
				};
				mutateCreateReviewSession(mutateArgs, {
					onSuccess: () => setReviewStage("after"),
				});
			} else {
				updateRemainingTerms({ passfail: passOrFail });
				setBackWasShown(false);
			}
		},
		[remainingTerms, backWasShown, reviewSession, reviewEntries]
	);

	useEffect(() => {
		window.addEventListener("keydown", (e) => handlePassFail({ e }));
		return () => window.removeEventListener("keydown", (e) => handlePassFail({ e }));
	}, []);

	/**
	 * Remove (case `pass`) or re-shuffle (case `fail`) the first entry of
	 * remainingTerms `depending` on given `passfail`. Intended only to be
	 * triggered on user interaction with a ReviewCard.
	 */
	function updateRemainingTerms({ passfail }: { passfail: PassFail }) {
		switch (passfail) {
			case "pass":
				return setRemainingTerms((current) => current.slice(1));
			case "fail":
				return setRemainingTerms((current) => shuffleFirstEntry(current));
		}
	}

	/** Session progress state derived from other pieces of state. */
	const completion = useMemo(() => {
		if (!remainingTerms)
			return {
				count: 0,
				percentage: 0,
			};

		const completedCount = cardTerms.length - remainingTerms.length;
		const progress = Math.floor((100 * completedCount) / cardTerms.length);

		return {
			count: completedCount,
			percentage: progress,
		};
	}, [remainingTerms, cardTerms.length, reviewSession.n]);

	return {
		backWasShown,
		setBackWasShown,
		remainingTerms,
		completion,
		handlePassFail,
		reviewSession,
	} as const;
}
