import React from "react";
import ListProgressSection from "./ListProgressSection";
import ListReviewSection from "./ListReviewSection";
import useList from '../../useList';

const ListMeta = ({ terms, suggestedTermsForReview, updateTermsToReview, numTermsToReview, setSelectingTerms, selectingTerms }) => {

    return (
        <section className="List__meta">
            {terms && <ListProgressSection {...{terms, suggestedTermsForReview, updateTermsToReview}} /> }
            <ListReviewSection {...{ numTermsToReview, setSelectingTerms, selectingTerms, updateTermsToReview }} />
        </section>
    )
}

export default ListMeta