import { useReview } from "components/review/hooks/useReview";
import useRouteProps from "hooks/useRouteProps";
import { Link } from "react-router-dom";
import * as S from "./Review.style";
import ReviewCard from "./ReviewCard";
import ReviewInfo from "./ReviewInfo";

type ReviewProps = {
	cardTerms: Term[];
};

export default function Review({ cardTerms }: ReviewProps) {
	const { params } = useRouteProps();
	const {
		backWasShown,
		remainingTerms,
		completion,
		handlePassFail,
		reviewSession,
		setBackWasShown,
	} = useReview({ cardTerms });

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
					<ReviewCard
						term={...remainingTerms[0]}
						direction={reviewSettings.direction}
						setBackWasShown={setBackWasShown}
					/>

					{backWasShown ? (
						<S.Buttons>
							{["fail", "pass"].map((passfail: PassFail) => {
								return (
									<S.Button
										passfail={passfail}
										key={passfail}
										onClick={() => handlePassFail({ passfail })}
										disabled={!backWasShown}
										type="button"
										value={passfail[0].toUpperCase() + passfail.slice(1)}
									/>
								);
							})}
						</S.Buttons>
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
}
