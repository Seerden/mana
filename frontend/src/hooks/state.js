import { useEffect} from 'react'

export const useLogState = (name, state, setState) => {
    /**
     * useEffect hook to log whenever a piece of state (or its initializer) changes
     * @param   state       expected to be the return values of a useState call, but can be any variable that needs to be logged on change
     * @param   setState    ^
     * @return  undefined
     * 
     * @todo    change args to take multiple pieces of state, each with their own dependency array
     */

    useEffect(() => {
        state && console.log(`${name} changed:`, state);
    }, [name, state, setState])
}
