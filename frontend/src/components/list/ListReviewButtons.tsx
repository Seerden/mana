import React from "react";
import { Link } from "react-router-dom";
import './ListReviewButtons.scss';

const ListReviewButtons = (props) => {
    const kind = 'full';
    const base = "ListReviewButtons";

    return (
        <div className={`${base}`}>
            <header className={`${base}__header`}>
                Review
            </header>
            <Link 
                className={`${base}__link`}
                to={`review?kind=${kind}`}
            >
                Review all terms
            </Link>

            <Link 
                className={`${base}__link`}
                to={`review?kind=selective`}
            >
                Select terms and review
            </Link>
        </div>
    )
}

export default ListReviewButtons