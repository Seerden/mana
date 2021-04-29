import React, { useCallback, useState } from 'react'

export function useToggle(initial: boolean) {
    const [toggleState, setToggleState] = useState<boolean>(initial);

    const toggle = useCallback(() => setToggleState(current => !current), [toggleState]);

    return [toggleState, toggle, setToggleState] as const;
}