import * as S from "./ListReviewButtons.style";

const ListReviewButtons = () => {
	return (
		<S.ReviewButtons>
			<S.Header>Review</S.Header>
			{/* TODO: use URLSearchParams instead of manually building the path like this */}
			<S.ReviewLink to={`review`}>Review all terms</S.ReviewLink>
		</S.ReviewButtons>
	);
};

export default ListReviewButtons;
