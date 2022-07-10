import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
	reviewSettingsState,
	termsToReviewState,
	timePerCardState,
} from "state/atoms/reviewAtoms";
import { useRouteProps } from "../../../hooks/routerHooks";

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
			resetTermsToReview();
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
