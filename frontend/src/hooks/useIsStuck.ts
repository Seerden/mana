import { useEffect, useState } from "react";

/**
 * Given a ref and some intersection options, create an intersection observer
 * that returns true when the observer detects an intersection, and false
 * otherwise.
 */
export default function useIsIntersecting(
	ref: React.MutableRefObject<Element>,
	options?: IntersectionObserverInit
) {
	const [isStuck, setIsStuck] = useState<boolean>(false);

	useEffect(() => {
		if (!ref?.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIsStuck(!entry.isIntersecting);
		}, options ?? {});

		observer.observe(ref.current);

		return () => {
			ref?.current && observer.unobserve(ref.current);
		};
	}, [ref]);

	return [isStuck] as const;
}
