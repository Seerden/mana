import React, { useState } from 'react'

export function useToggle(initial: boolean) {
    const [toggleState, setToggleState] = useState<boolean>(initial);

    const toggle = () => setToggleState(current => !current);

    return [toggleState, toggle, setToggleState] as const;
}