import { reviewSettingsState } from "components/review/state/reviewAtoms";
import ReviewCard from "components/review/sub/ReviewCard";
import { Term } from "gql/codegen-output";
import { useCallback, useState } from "react";
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
