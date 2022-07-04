import useTimer from "hooks/useTimer";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { reviewSettingsState } from "state/atoms/reviewAtoms";
import { numTermsToReviewState } from "state/selectors/reviewSelectors";
import "./ReviewInfo.scss";

type ReviewInfoProps = {
	progress: number;
	completedCount: number;
};

const ReviewInfo = memo(({ progress, completedCount }: ReviewInfoProps) => {
	const [reviewSettings] = useRecoilState(reviewSettingsState);
	const numTermsToReview = useRecoilValue(numTermsToReviewState);
	const { sessionStart: start, n } = reviewSettings;
	const { timeSinceStart, title } = useTimer({ start });

	return (
		<details className="Review__info">
			<summary>
				<span className="Review__info--header">
					<span>Session information</span>
				</span>
			</summary>

			<div className="Review__info--dynamic">
				<div className="Review__info--completion">
					Session completion: {progress}% ({completedCount}/{n * numTermsToReview}).
					<div>
						You started this session <span title={title}>{timeSinceStart}</span>.
					</div>
				</div>
			</div>

			<div className="Review__info--hideable">
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
			</div>
		</details>
	);
});

export default ReviewInfo;
