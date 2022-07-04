import { useReview } from "hooks/review/useReview";
import { useRouteProps } from "hooks/routerHooks";
import { memo } from "react";
import { Link } from "react-router-dom";
import * as S from "./Review.style";
import ReviewInfo from "./ReviewInfo/ReviewInfo";

const Review = memo(() => {
	const { params } = useRouteProps();
	const {
		backWasShown,
		remainingTerms,
		completion,
		handlePassFailClick,
		makeReviewCard,
	} = useReview();

	return (
		<S.Review className="PageWrapper">
			<S.Header className="PageHeader">
				<div>Reviewing.</div>
				<div>
					{/* TODO: Implement Button class as a Styled snippet and wrap this Link with it */}
					<Link className="Button" to={`/u/${params.username}/list/${params.id}`}>
						Back to list
					</Link>
				</div>
			</S.Header>

			{remainingTerms.length && (
				<>
					{makeReviewCard({ ...remainingTerms[0] })}

					{backWasShown ? (
						<>
							<S.Buttons>
								{["fail", "pass"].map((str: PassFail) => {
									return (
										<S.Button
											passfail={str}
											key={str}
											onClick={(e) => {
												if (backWasShown) handlePassFailClick(e, str);
											}}
											disabled={!backWasShown}
											type="button"
											value={str[0].toUpperCase() + str.slice(1)}
										/>
									);
								})}
							</S.Buttons>
						</>
					) : (
						<S.PreventNextCard>
							Cannot move on to the next term until you've seen the back of the
							card.
						</S.PreventNextCard>
					)}

					<S.ProgressWrapper>
						<S.ProgressBar widthPercent={`${completion.percentage}%`} />
					</S.ProgressWrapper>

					<ReviewInfo completion={completion} />
				</>
			)}
		</S.Review>
	);
});

export default Review;
