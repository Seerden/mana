/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState, memo } from "react";
import './css/ReviewTerm.css'

const ReviewTerm = memo(({ dispatch, term }) => {

    return (
        <div className="ReviewTerm">
            {JSON.stringify(term)}
        </div>
    )
})

export default ReviewTerm