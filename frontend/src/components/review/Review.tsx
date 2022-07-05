import { useReview } from "hooks/review/useReview";
import { useRouteProps } from "hooks/routerHooks";
import { Link } from "react-router-dom";
import * as S from "./Review.style";
import ReviewInfo from "./ReviewInfo/ReviewInfo";

const Review = () => {
	const { params } = useRouteProps();
	const { backWasShown, remainingTerms, completion, handlePassFail, makeReviewCard } =
		useReview();

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

			{remainingTerms.length > 0 && (
				<>
					{makeReviewCard({ ...remainingTerms[0] })}

					{backWasShown ? (
						<>
							<S.Buttons>
								{["fail", "pass"].map((passfail: PassFail) => {
									return (
										<S.Button
											passfail={passfail}
											key={passfail}
											onClick={() => {
												handlePassFail({ passfail });
											}}
											disabled={!backWasShown}
											type="button"
											value={passfail[0].toUpperCase() + passfail.slice(1)}
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
};

export default Review;
