import React from "react";

const ReviewInfo = ({ numTerms, n, progress }) => {

    return (
        <div className="Review__info">
            <h2 className="Review__info--header">
                Session information
            </h2>

            <div className="Review__info--dynamic">
                <div className="Review__info--completion">
                    Session completion: {progress}%.
                </div>
            </div>

            <div className="Review__info--hideable">
                <div>
                    Number of terms in this list: {numTerms}.
                </div>
                <div>
                    Pass each term {n} time{n !== 1 ? 's' : ''} to complete the session.
                </div>
            </div>

        </div>
    )
}

export default ReviewInfo