import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import useRouteProps from "../../../hooks/useRouteProps";
import { reviewSessionState } from "../state/review-session";

export function usePostReview() {
	const { navigate, params } = useRouteProps();
	const formatDate = (date: Date) => dayjs(date).format("HH:mm:ss");
	const { start_date, end_date } = useRecoilValue(reviewSessionState);

	useEffect(() => {
		return () => {
			// on unmount, we want to reset cardTerms, reviewSession,
			// reviewEntries. But do we not want to do this from ReviewPage instead?
		};
	}, []);

	return {
		navigate,
		params,
		formatDate,
		start_date,
		end_date,
	} as const;
}
