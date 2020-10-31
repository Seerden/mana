import React, {memo, useState, useEffect, createContext } from 'react';
import { useLogState } from '../hooks/state';
import { storeUser } from '../hooks/auth';
export const LoginContext = createContext(null);

export const LoginProvider = memo((props) => {
    const [currentUser, setCurrentUser] = useState(storeUser(null, 'get'));

    const login = user => {
        setCurrentUser(user);
        storeUser(user, 'set')
    }

    const logout = () => {
        setCurrentUser(null);
        storeUser(null, 'remove')
    }

    useLogState('LoginContext: currentUser', currentUser)

    useEffect(() => {
        // verify localstorage user against db on LoginContext mount
    }, [])

    return (
        <LoginContext.Provider value={{...{currentUser, login, logout} }}>
            {props.children}
        </LoginContext.Provider>
    )
})