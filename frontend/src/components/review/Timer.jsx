import React, { useState, useEffect, memo, useMemo } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

/**
 * JSX <span> component displaying sessionStart.fromNow();
 */
const Timer = memo(({ start }) => {
    const [timer, setTimer] = useState(null);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const timerInterval = setInterval(() => setElapsed(Math.round(Math.floor(Date.now() - start)/1000)), 1000)
        return () => clearInterval(timerInterval)
    }, [])

    useEffect(() => {
        setTimer(dayjs(start).fromNow())
    }, [elapsed])

    return (
        <span title={`${dayjs(start).format('hh:mm:ss A')}`} className="Timer">
            <strong>{timer}</strong>
        </span>
    )
})

export default Timer