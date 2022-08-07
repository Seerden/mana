import { useCallback, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isValidReviewSession } from "../helpers/validate-session";
import {
	reviewSessionState,
	ReviewStages,
	reviewStageState,
} from "../state/review-atoms";
import SettingsButton from "../sub/SettingsButton";

/**
 * Functionality hook for PreReview.tsx, tightly coupled to the view.
 *
 * - Exposes two sets of buttons: for `n` and for `direction`
 * - Exposes a click handler that 'starts' the review session by finalizing
 *   reviewSession state and updating reviewStage.
 */
export default function usePreReview() {
	const [reviewSession, setReviewSession] = useRecoilState(reviewSessionState);
	const setReviewStage = useSetRecoilState(reviewStageState);

	/** Update reviewSession state with the newly chosen setting. */
	function handleSettingsChange(e: React.MouseEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget; // name should be either `n` or `direction`
		const castValue = name === "n" ? +value : value;
		setReviewSession((current) => ({ ...current, [name]: castValue }));
	}

	/** Add `start_date` to reviewSession, validate reviewSession and set review stage */
	const handleReviewStartClick = useCallback(() => {
		const sessionWithDate: typeof reviewSession = {
			...reviewSession,
			start_date: new Date().valueOf(),
		};

		if (!isValidReviewSession(sessionWithDate)) {
			console.log({ sessionWithDate });
			// TODO: properly handle this by popping up a message or something
			return;
		}

		setReviewSession(sessionWithDate);
		setReviewStage(ReviewStages.STARTED);
	}, [reviewSession]);

	const nButtons = useMemo(() => {
		return [1, 2, 3, 4, 5].map((num: number) => (
			<SettingsButton
				field="n"
				key={num}
				value={num}
				selected={reviewSession.n && num === reviewSession.n}
				onClick={(e) => handleSettingsChange(e)}
			/>
		));
	}, [reviewSession.n]);

	const directionButtons = useMemo(() => {
		return ["forwards", "backwards"].map((d: Direction) => (
			<SettingsButton
				key={d}
				value={d}
				field="direction"
				selected={reviewSession.direction && d === reviewSession.direction}
				onClick={(e) => handleSettingsChange(e)}
			/>
		));
	}, [reviewSession.direction]);

	return {
		nButtons,
		directionButtons,
		handleReviewStartClick,
	} as const;
}
