import React, { useState, useEffect, memo } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);

interface TimerProps {
    start: Date | null
}

/**
 * JSX component that renders time (in seconds) since mount.
 */
const Timer = memo(({ start }: TimerProps) => {
    const [timer, setTimer] = useState<string | null>(null);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (start) {
            const timerInterval = setInterval(() => setElapsed(Math.round(Math.floor(Date.now() - start.valueOf())/1000)), 1000)
            return () => clearInterval(timerInterval)
        }
    }, [])

    useEffect(() => {
        if (start) {
            setTimer(dayjs(start).fromNow())
        }
    }, [elapsed])

    return (
        <span title={start ? `${dayjs(start).format('hh:mm:ss A')}`: ''} className="Timer">
            <strong>{timer}</strong>
        </span>
    )
})

export default Timer