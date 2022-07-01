import * as S from "./ListReviewButtons.style";

const ListReviewButtons = () => {
	const kind = "full";

	return (
		<S.ReviewButtons>
			<S.Header>Review</S.Header>
			<S.ReviewLink to={`review?kind=${kind}`}>Review all terms</S.ReviewLink>
		</S.ReviewButtons>
	);
};

export default ListReviewButtons;
