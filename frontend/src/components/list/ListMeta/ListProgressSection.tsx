import React from "react";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import ListSaturationState from "../ListSaturationState";

const ListProgressSection = ({ terms, suggestedTermsForReview, updateTermsToReview }) => {

    return (
        <section className="List__section">
            <header className="List__section--header">
                <span className="List__section--heading">Progress</span>
            </header>
            {terms && <ListSaturationState terms={terms} />}

            {suggestedTermsForReview && (suggestedTermsForReview.forwards.length > 0 || suggestedTermsForReview.backwards.length > 0)
                ?
                <div>
                    <h4 className="List__section--header" style={{ backgroundColor: 'orangered', marginTop: '0.5rem' }}>Due for review:</h4>
                    <div>
                        <BiArrowToRight /> {suggestedTermsForReview.forwards.length} terms due.
                        <button
                            className="List__review--button"
                            onClick={() => updateTermsToReview({ type: 'overdue', direction: 'forwards' })}
                        >Select for review.</button>
                    </div>
                    <div>
                        <BiArrowToLeft /> {suggestedTermsForReview.backwards.length} terms due.
                        <button
                            className="List__review--button"
                            onClick={() => updateTermsToReview({ type: 'overdue', direction: 'backwards' })}
                        >Select for review.</button>
                    </div>
                </div>
                :
                <div className="List__section--header" style={{ color: 'black', backgroundColor: 'deepskyblue', marginTop: '0.5rem' }}>
                    No terms due for review yet.
                </div>
            }
        </section>
    )
}

export default ListProgressSection