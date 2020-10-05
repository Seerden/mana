/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState, memo } from "react";
import './css/ReviewTerm.css'

const ReviewTerm = memo(({ term }) => {
    const [isFront, setIsFront] = useState(true);
    // const term = { front: 'test front', back: 'test back' }
    const [shownTerm, setShownTerm] = useState(null)
    const duration = 100

    useEffect(() => {
        setShownTerm(isFront ? term.EN : term.JA)
    }, [term])

    useEffect(() => {
        setTimeout(() => {setShownTerm(isFront ? term.EN : term.JA)}, duration)
        //eslin
    }, [isFront])

    const windowKeyup = (e) => {
        if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
            // console.log(e.code)
            setIsFront(!isFront)
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', windowKeyup)
        return () => {window.removeEventListener('keyup', windowKeyup)}

    }, [isFront])

    const handleCardClick = e => {
        e.preventDefault();
        setIsFront(!isFront)
    }

    return (
        <div className="ReviewTerm">
            {/* details implemented, but display something like this: */}
            {/* doesn't work at all like desired functionality, very wip */}
            <div className="card-wrapper">
                <div onClick={handleCardClick} className={`card-front ${isFront ? 'show' : 'hide'}`}>{isFront ? shownTerm : ''}</div>
                <div onClick={handleCardClick} className={`card-back ${isFront ? 'hide' : 'show'}`}>{isFront ? '' : shownTerm}</div>
                <div className="card-progress"></div>
            </div>

        </div>
    )
})

export default ReviewTerm

/*
TODO: fix artifacting on animation */