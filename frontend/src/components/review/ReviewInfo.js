import React from "react";

const ReviewInfo = ({ list, n, progress }) => {

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
                {list.content.length} terms in this session, to be reviewed {n} times each.
            </div>

        </div>
    )
}

export default ReviewInfo