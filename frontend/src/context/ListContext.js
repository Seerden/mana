import React, { useState, createContext } from "react";
import { useLogState } from '../hooks/state';

export const ListContext = createContext(null);

export const ListProvider = (props) => {
    const [listContextValue, setListContextValue] = useState(() => {});
    useLogState('listContextValue', listContextValue);

    return (
        <ListContext.Provider value={{listContextValue, setListContextValue}}>
            {props.children}
        </ListContext.Provider>
    )
}