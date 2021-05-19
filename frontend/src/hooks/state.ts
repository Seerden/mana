import { useEffect } from 'react'

/**
     * useEffect hook to log whenever a piece of state (or its initializer) changes
     * @param   state       expected to be the return values of a useState call, but can be any variable that needs to be logged on change
     * @param   setState    ^
     * @return  undefined
     * 
     * @todo    change args to take multiple pieces of state, each with their own dependency array
     */
export const useLogState = (name, state, setState) => {
    useEffect(() => {
        state && console.log(`${name} changed:`, state);
    }, [name, state, setState])
}

/**
 * Simple form input blur handler. Only works on top-level keys, don't use for nested form state.
 * @param {React.FocusEvent} e event object
 * @param {*} state useState state
 * @param {React.Dispatch<React.SetStateAction>} setState useState setter
 */
export const handleFormBlur = (e, state, setState) => {
    let t = e.currentTarget;
    
    // if ( !(!state[t.name] && !t.value) && (!state[t.name] || (state[t.name] && state[t.name] !== t.value))) {  // check if value exists and differs from current value
    setState({...state, [t.name]: t.value})
    // }
}

/* to check whether key exists in state:
        option 1: 
            if (!Object.keys(state).includes(t.name))
            works if state is null or undefined
        option 2:
            if (!state[t.name])
            works only is state is already an object (so for this, need to initialize useState with empty object, and not null) */