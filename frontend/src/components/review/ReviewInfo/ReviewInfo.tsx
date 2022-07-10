import { reviewSettingsState } from "components/review/state/reviewAtoms";
import { numTermsToReviewState } from "components/review/state/reviewSelectors";
import useTimer from "hooks/useTimer";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "./ReviewInfo.style";

type ReviewInfoProps = {
	completion: {
		count: number;
		percentage: number;
	};
};

const ReviewInfo = memo(({ completion }: ReviewInfoProps) => {
	const [reviewSettings] = useRecoilState(reviewSettingsState);
	const numTermsToReview = useRecoilValue(numTermsToReviewState);
	const { sessionStart: start, n } = reviewSettings;
	const { timeSinceStart, title } = useTimer({ start });

	return (
		<S.ReviewInfo>
			<S.Summary>
				<S.Header>
					<span>Session information</span>
				</S.Header>
			</S.Summary>

			<S.Datum>
				Session completion: {completion.percentage}% ({completion.count}/
				{n * numTermsToReview}).
				<div>
					You started this session <span title={title}>{timeSinceStart}</span>.
				</div>
			</S.Datum>

			<S.Datum>
				<div>
					Number of terms in this list: <strong>{numTermsToReview}</strong>.
				</div>
				<div>
					Pass each term{" "}
					<strong>
						{n} time{n !== 1 ? "s" : ""}
					</strong>{" "}
					to complete the session.
				</div>
			</S.Datum>
		</S.ReviewInfo>
	);
});

export default ReviewInfo;
