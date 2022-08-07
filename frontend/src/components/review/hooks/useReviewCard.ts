import { Term } from "gql/codegen-output";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const duration = 250; // match keyframes animation duration TODO: use theme variable for this

enum ValueFields {
	TO = "to_value",
	FROM = "from_value",
}

export function useReviewCard(
	direction: Direction,
	term: Term,
	setBackWasShown: Dispatch<SetStateAction<boolean>>
) {
	const [side, setSide] = useState(
		direction === "forwards" ? ValueFields.FROM : ValueFields.TO
	);
	const [flipping, setFlipping] = useState(false);
	const [fade, setFade] = useState(false);
	const toggleSide = () =>
		setSide((cur) => (cur === ValueFields.FROM ? ValueFields.TO : ValueFields.FROM));
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
		// When a new term is shown, reset card state
		setSide(direction === "forwards" ? ValueFields.FROM : ValueFields.TO);
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
