import React, { useState, memo } from "react";
import Timer from './Timer';
import './ReviewInfo.css';

const ReviewInfo = memo(({ start, numTerms, n, progress }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <details className="Review__info">
            <summary>
                <span className="Review__info--header">
                    <span>Session information</span>
                </span>
            </summary>

            <div className="Review__info--dynamic">
                <div className="Review__info--completion">
                    Session completion: {progress}%.
                    <div>
                        You started this session <Timer start={start} />.
                    </div>
                </div>
            </div>

            <div className="Review__info--hideable">
                <div>
                    Number of terms in this list: <strong>{numTerms}</strong>.
                </div>
                <div>
                    Pass each term <strong>{n} time{n !== 1 ? 's' : ''}</strong> to complete the session.
                </div>
            </div>

        </details>
    )
})

export default ReviewInfo