import React, { useState,useEffect, createContext } from "react";
import { useLogState } from '../hooks/state';
import { updateList } from '../helpers/db.api';

export const ListContext = createContext(null);

export const ListProvider = (props) => {
    const [listContextValue, setListContextValue] = useState(() => {});

    return (
        <ListContext.Provider value={{listContextValue, setListContextValue}}>
            {props.children}
        </ListContext.Provider>
    )
}