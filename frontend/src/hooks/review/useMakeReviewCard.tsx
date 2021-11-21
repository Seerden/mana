import { Term } from "gql/codegen-output";
import { useCallback, useState } from "react";
import ReviewCard from "components/review/ReviewCard/ReviewCard";
import { reviewSettingsState } from "state/atoms/reviewAtoms";
import { useRecoilValue } from "recoil";

export function useMakeReviewCard() {
	const [backWasShown, setBackWasShown] = useState<boolean>(false);

	const reviewSettings = useRecoilValue(reviewSettingsState);

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
		[reviewSettings.direction, setBackWasShown]
	);

	return { makeReviewCard, backWasShown, setBackWasShown } as const;
}
