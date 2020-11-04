import React, { memo, useState, useRef, useEffect } from "react";

const ReviewCard = memo(({ setBackWasShown, direction, term }) => {
    const [side, setSide] = useState(direction === 'forwards' ? 'from' : 'to'),
        [flipping, setFlipping] = useState(false),
        [fade, setFade] = useState(false),
        toggleSide = () => setSide(side === 'from' ? 'to' : 'from');
    let timeouts = useRef([]);

    useEffect(() => {  // add, remove or recreate up/down key handler
        window.addEventListener('keyup', handleArrowUpDownKeyup)
        return () => {
            window.removeEventListener('keyup', handleArrowUpDownKeyup)
            
        }
    }, [side])  // only flips correctly once per render if side not specified as dependency

    useEffect(() => { // when new term is shown, reset card state
        setSide(direction === 'forwards' ? 'from' : 'to')
        setFade(true)
        timeouts.current.push(setTimeout(() => {
            setFade(false)
        }, 150))
    }, [term])

    useEffect(() => {  // clean up timeouts on unmount
        return () => {
            for (let timeout of timeouts.current) {
                window.clearTimeout(timeout);
            }
        }
    }, [])

    const handleArrowUpDownKeyup = (e) => {
        if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
            flip();
        }
    }

    const flip = () => {
        let duration = 250  // match keyframes animation duration
        setFlipping(true);
        timeouts.current.push(setTimeout(() => setFlipping(false), duration))
        timeouts.current.push(setTimeout(() => toggleSide(), duration / 2));
        setBackWasShown(true)
    }

    return (
        <div onClick={flip} className={`Review__current ReviewCard ${fade ? 'fadein' : ''} ${flipping ? 'flip' : ''}`}>
            { term[side]}
        </div>
    )
})

export default ReviewCard

/*
Review card functionality:
- Serve one term at a time in the form of a card.
- Start by showing front, i.e. 'from' side.
- @todo Hide pass/fail buttons and pass/fail functionality until the back has been shown at least once.
- Flip between front and back by clicking the card and with up/down arrow keys, mark pass/fail by clicking the two button elements and with left/right arrow keys.
*/