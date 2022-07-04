import { Term } from "gql/codegen-output";
import { useEffect, useRef, useState } from "react";

export function useReviewCard(direction: Direction, term: Term, setBackWasShown) {
	const [side, setSide] = useState(direction === "forwards" ? "from" : "to");
	const [flipping, setFlipping] = useState(false);
	const [fade, setFade] = useState(false);
	const toggleSide = () => setSide((cur) => (cur === "from" ? "to" : "from"));
	const timeouts = useRef<any[]>([]);

	useEffect(() => {
		window.addEventListener("keyup", handleArrowUpDownKeyup);
		return () => {
			window.removeEventListener("keyup", handleArrowUpDownKeyup);

			for (const timeout of timeouts.current) {
				window.clearTimeout(timeout);
			}
		};
	}, []);

	useEffect(() => {
		// when new term is shown, reset card state
		setSide(direction === "forwards" ? "from" : "to");
		setFade(true);
		timeouts.current.push(
			setTimeout(() => {
				setFade(false);
			}, 150)
		);
	}, [term]);

	function handleArrowUpDownKeyup(e: KeyboardEvent) {
		if (["ArrowUp", "ArrowDown"].includes(e.code)) {
			flip();
		}
	}

	function flip() {
		const duration = 250; // match keyframes animation duration
		setBackWasShown(true);
		setFlipping(true);
		timeouts.current.push(setTimeout(() => setFlipping(false), duration));
		timeouts.current.push(setTimeout(() => toggleSide(), duration / 2));
	}

	return {
		flip,
		fade,
		flipping,
		side,
	};
}
