import React, { memo, useState, useEffect } from "react";
import { useLogState } from '../hooks/state';

const ReviewCard = memo(({ term }) => {
    const [side, setSide] = useState('from');
    const [flipping, setFlipping] = useState(false);
    const [lastFlip, setLastFlip ] = useState(Date.now());
    const toggleSide = () => setSide(side === 'from' ? 'to' : 'from')

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
        return () => {
            window.removeEventListener('keyup', handleKeyup)
        }
    }, [side])

    const handleKeyup = (e) => {
        if (['ArrowUp', 'ArrowDown'].includes(e.code)) flip();
    }

    const flip = () => {
        let duration = 250
        setFlipping(true);
        setTimeout(() => setFlipping(false), duration)
        setTimeout(() => toggleSide(), duration / 2);

    }

    return (
        <div className={`Review__current ReviewCard ${flipping ? 'flip' : ''}`}>
            {term[side]}
        </div>
    )
})

export default ReviewCard