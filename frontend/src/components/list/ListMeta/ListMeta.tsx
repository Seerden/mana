import React from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { Link } from "react-router-dom";
import ListSaturationState from '../ListSaturationState';
import ListProgressSection from "./ListProgressSection";
import ListReviewSection from "./ListReviewSection";


const ListMeta = ({ terms, suggestedTermsForReview, updateTermsToReview, numTermsToReview, setSelectingTerms, selectingTerms }) => {

    return (
        <section className="List__meta">
            {terms && <ListProgressSection {...{terms, suggestedTermsForReview, updateTermsToReview}} /> }
            <ListReviewSection {...{ numTermsToReview, setSelectingTerms, selectingTerms, updateTermsToReview }} />
        </section>
    )
}

export default ListMeta