import React, { useState,useEffect, createContext } from "react";

export const ListContext = createContext(null);

export const ListProvider = (props) => {
    const [listContextValue, setListContextValue] = useState(() => {});

    return (
        <ListContext.Provider value={{listContextValue, setListContextValue}}>
            {props.children}
        </ListContext.Provider>
    )
}