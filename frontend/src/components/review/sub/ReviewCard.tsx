import { Term } from "gql/codegen-output";
import React, { memo } from "react";
import { useReviewCard } from "../hooks/useReviewCard";
import * as S from "./ReviewCard.style";

type ReviewCardProps = {
	setBackWasShown: React.Dispatch<React.SetStateAction<boolean>>;
	direction: "forwards" | "backwards";
	term: Term;
};

const ReviewCard = memo(({ setBackWasShown, direction, term }: ReviewCardProps) => {
	const { side, fade, flipping, flip } = useReviewCard(direction, term, setBackWasShown);

	return (
		<S.ReviewCard flipping={flipping} fadeIn={fade} onClick={flip}>
			{term[side]}
		</S.ReviewCard>
	);
});

export default ReviewCard;
