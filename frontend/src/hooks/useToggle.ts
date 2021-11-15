import { useState } from "react";

export function useToggle(initial: boolean) {
	const [toggleState, setToggleState] = useState<boolean>(initial);

    function toggle() {
        setToggleState((state) => !state)
    }

	return [toggleState, toggle, setToggleState] as const;
}
