import { Term } from "gql/codegen-output";
import { useState, useRef, useEffect, useCallback } from "react";

export function useReviewCard(direction: Direction, term: Term, setBackWasShown) {
    const [side, setSide] = useState(direction === 'forwards' ? 'from' : 'to');
    const [flipping, setFlipping] = useState(false);
    const [fade, setFade] = useState(false);
    const toggleSide = () => setSide(cur => cur === 'from' ? 'to' : 'from');
    const timeouts = useRef<any[]>([]);

    useEffect(() => {  // (re)create keyup handler on `side` change
        window.addEventListener('keyup', handleArrowUpDownKeyup)
        return () => {
            window.removeEventListener('keyup', handleArrowUpDownKeyup)
        }
    }, [side])

    useEffect(() => {  // when new term is shown, reset card state
        setSide(direction === 'forwards' ? 'from' : 'to')
        setFade(true)
        timeouts.current.push(setTimeout(() => {
            setFade(false)
        }, 150))
    }, [term])

    useEffect(() => {  // clean up timeouts on unmount
        return () => {
            for (const timeout of timeouts.current) {
                window.clearTimeout(timeout);
            }
        }
    }, [])

    function handleArrowUpDownKeyup(e) {
        if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
            flip();
        }
    }

    const flip = useCallback(() => {
        const duration = 250; // match keyframes animation duration
        setBackWasShown(true);
        setFlipping(true);
        timeouts.current.push(setTimeout(() => setFlipping(false), duration));
        timeouts.current.push(setTimeout(() => toggleSide(), duration / 2));
    }, [setFlipping, setBackWasShown, setSide]);

    return {
        flip, 
        fade,
        flipping,
        side
    }
}