import React, { createContext, useState, memo, useEffect } from "react";
import { useLogState } from "../hooks/state";

export const ReviewContext = createContext(null);

export const ReviewProvider = memo(props => {
    const [reviewContext, setReviewContext] = useState({
        settings: {
            direction: "forwards",
            n: "2",
            started: false,
        }
    });

    return (
        <ReviewContext.Provider value={{...{reviewContext, setReviewContext}}}>
            { props.children }
        </ReviewContext.Provider>
    )
})

