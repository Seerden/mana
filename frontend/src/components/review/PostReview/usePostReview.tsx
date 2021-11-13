import { useEffect } from "react";
import dayjs from "dayjs";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { useRouteProps } from "../../../hooks/routerHooks";
import {
	timePerCardState,
	reviewSettingsState,
	termsToReviewState,
} from "state/atoms/reviewAtoms";

export function usePostReview() {
	const { navigate, params } = useRouteProps();
	const formatDate = (date: Date) => dayjs(date).format("HH:mm:ss");
	const { sessionStart, sessionEnd } = useRecoilValue(reviewSettingsState);
	const resetTermsToReview = useResetRecoilState(termsToReviewState);
	const timePerCard = useRecoilValue(timePerCardState);
	const reviewSettings = useRecoilValue(reviewSettingsState);
	const resetTimePerCard = useResetRecoilState(timePerCardState);

	useEffect(() => {
		return () => {
            resetTermsToReview()
			resetTimePerCard();
        };
	}, []);

	return {
		navigate,
		params,
		formatDate,
		sessionStart,
		sessionEnd,
		timePerCard,
		reviewSettings,
	} as const;
}
