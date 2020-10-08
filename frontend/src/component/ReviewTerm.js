/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState, memo } from "react";
import './css/ReviewTerm.css'

const ReviewTerm = memo(({ dispatch, term }) => {
    const [isFront, setIsFront] = useState(true);
    const [shownTerm, setShownTerm] = useState(null);
    const [justRendered, setJustRendered] = useState(false);

    const duration = 100

    useEffect(() => {
        setShownTerm(isFront ? term.from : term.to)
    }, [term])

    useEffect(() => {
        setTimeout(() => { setShownTerm(isFront ? term.from : term.to) }, duration)
    }, [isFront])

    const windowKeyup = (e) => {
        switch (e.code) {
            case 'ArrowUp':
            case 'ArrowDown':
                setIsFront(!isFront);
                break;
            case 'ArrowLeft':
                setJustRendered(true);
                setTimeout(() => {setJustRendered(false)}, 250)
                
                dispatch({ type: 'decrement' });
                break;
            case 'ArrowRight':
                setJustRendered(true);
                setTimeout(() => {setJustRendered(false)}, 250)
                
                dispatch({ type: 'increment' });
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', windowKeyup)
        return () => { 
            setTimeout(() => { setJustRendered(false) }, duration);
            window.removeEventListener('keyup', windowKeyup) 
        }

    }, [isFront])

    const handleCardClick = e => {
        e.preventDefault();
        setIsFront(!isFront)
    }

    return (
        <div className="ReviewTerm render">
            {/* details implemented, but display something like this: */}
            {/* doesn't work at all like desired functionality, very wip */}
            <div className={`card-wrapper ${justRendered ? 'render' : ''}`}>
                <div onClick={handleCardClick} className={`card-front ${isFront ? 'show' : 'hide'}`}>{isFront ? shownTerm : ''}</div>
                <div onClick={handleCardClick} className={`card-back ${isFront ? 'hide' : 'show'}`}>{isFront ? '' : shownTerm}</div>
                <div className="card-progress"></div>
            </div>

        </div>
    )
})

export default ReviewTerm

/*
DONE: fix artifacting on animation
TODO: figure out if passing currentTerm as prop makes card rerender properly instead of passing new term through useEffect

TODO: implement timeLastFlipped and allow/disallow flip based on that

*/