import { Term } from "gql/codegen-output";
import React, { memo } from "react";
import "./ReviewCard.scss";
import { useReviewCard } from "./useReviewCard";

type ReviewCardProps = {
    setBackWasShown: React.Dispatch<React.SetStateAction<boolean>>;
    direction: "forwards" | "backwards";
    term: Term;
};

const ReviewCard = memo(({ setBackWasShown, direction, term }: ReviewCardProps) => {
    const { side, fade, flipping, flip } = useReviewCard(
        direction,
        term,
        setBackWasShown
    );

    return (
        <div
            onClick={flip}
            className={`ReviewCard ${fade ? "fadein" : ""} ${flipping ? "flip" : ""}`}
        >
            {term[side]}
        </div>
    );
});

export default ReviewCard;
