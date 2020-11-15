import React, { useState } from 'react'

export function useToggle(initial) {
    const [toggleState, setToggleState] = useState(initial);

    const toggle = () => setToggleState(current => !current);

    return [toggleState, toggle]
}