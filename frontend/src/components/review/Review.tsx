import { useReview } from "hooks/review/useReview";
import { useRouteProps } from "hooks/routerHooks";
import { memo } from "react";
import { Link } from "react-router-dom";
import "./Review.scss";
import ReviewInfo from "./ReviewInfo/ReviewInfo";

const Review = memo(() => {
	const { params } = useRouteProps();
	const {
		backWasShown,
		futureTerms,
		progress,
		completedCount,
		handlePassFailClick,
		makeReviewCard,
	} = useReview();

	return (
		<div className="PageWrapper Review">
			<div className="PageHeader Review__title">
				<div>Reviewing.</div>
				<div>
					<Link className="Button" to={`/u/${params.username}/list/${params.id}`}>
						Back to list
					</Link>
				</div>
			</div>

			{futureTerms.length > 0 && (
				<>
					{makeReviewCard({ ...futureTerms[0] })}

					{backWasShown ? (
						<>
							<div className="Review__buttons">
								{["fail", "pass"].map((str: PassFail) => {
									return (
										<input
											key={str}
											onClick={(e) => {
												if (backWasShown) handlePassFailClick(e, str);
											}}
											disabled={!backWasShown}
											className={`Review__button Review__button--${str}`}
											type="button"
											value={str[0].toUpperCase() + str.slice(1)}
										/>
									);
								})}
							</div>
						</>
					) : (
						<div className="Review__prevent">
							Cannot move on to the next term until you've seen the back of the
							card.
						</div>
					)}

					<div className="Review__progress--wrapper">
						<div
							className="Review__progress--bar"
							style={{ width: `${progress}%` }}
						/>
					</div>

					<ReviewInfo {...{ completedCount, progress }} />
				</>
			)}
		</div>
	);
});

export default Review;
