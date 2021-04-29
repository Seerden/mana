import { useRouteProps } from "hooks/routerHooks";
import React from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { Link } from "react-router-dom";

const ListReviewSection = ({ numTermsToReview, setSelectingTerms, selectingTerms, updateTermsToReview }) => {
    const { location } = useRouteProps();

    return (
        <section className="List__section">
                <header className="List__section--header">Review</header>

                <div className="List__section">
                    <header className="List__section--header">All</header>
                    <Link className="List__review--button" to={`${location.pathname}/review?kind=full`}>Review all terms</Link>
                </div>

                <div className="List__section">
                    <h4 className="List__section--header">Selective</h4>
                    {numTermsToReview > 0 &&
                        <Link style={{ marginBottom: '0.4rem' }} className="List__review--button" to={`${location.pathname}/review?kind=partial`}>Review {numTermsToReview} selected terms</Link>
                    }
                    <div>
                        <button onClick={() => setSelectingTerms(cur => !cur)} className="List__review--button">select manually {selectingTerms ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</button>
                    </div>
                    <div>
                        <button onClick={() => updateTermsToReview({ type: 'all' })} className="List__review--button">select all</button>
                        <button onClick={() => updateTermsToReview({ type: 'visible' })} className="List__review--button">select visible</button>
                        <button onClick={() => updateTermsToReview({ type: 'none' })} className="List__review--button">select none</button>
                    </div>
                </div>
            </section>
    )
}

export default ListReviewSection