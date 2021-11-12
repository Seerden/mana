import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { timeSince } from "helpers/time";
dayjs.extend(relativeTime);

type TimerProps = {
	start?: Date;
};

/**
 * JSX component that renders time (in seconds) since mount.
 */
function useTimer({ start }: TimerProps) {
	const [elapsed, setElapsed] = useState(0);

	useEffect(() => {
		if (start) {
			const timerInterval = setInterval(() => {
				return setElapsed(
					Math.round(Math.floor(Date.now() - start.valueOf()) / 1000)
				);
			}, 1000);

			return () => clearInterval(timerInterval);
		}
	}, []);

	const timeSinceStart = useMemo(() => timeSince(start), [elapsed]);
	const title = start ? `${dayjs(start).format("hh:mm:ss A")}` : "";

	return {
		timeSinceStart,
		title,
	};
}

export default useTimer;
