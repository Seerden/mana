import React, {memo, useState, useEffect, createContext, MemoExoticComponent, Context, ContextType } from 'react';
import { useLogState } from '../hooks/state';
import { storeUser } from '../helpers/localStorageHelpers';
export const LoginContext = createContext<LoginContextInterface>({ currentUser: null, login: null, logout: null});

interface LoginContextInterface {
    currentUser: string | null | undefined,
    login: Function | null,
    logout: Function | null,

}

export const LoginProvider = memo((props) => {
    const [currentUser, setCurrentUser] = useState<LoginContextInterface['currentUser']>(storeUser(null, 'get'));

    const login = user => {
        setCurrentUser(user);
        storeUser(user, 'set')
    }

    const logout = () => {
        setCurrentUser(null);
        storeUser(null, 'remove')
    }

    useLogState('LoginContext: currentUser', currentUser, null)

    useEffect(() => {
        // verify localstorage user against db on LoginContext mount
    }, [])

    return (
        <LoginContext.Provider value={{...{currentUser, login, logout} }}>
            {props.children}
        </LoginContext.Provider>
    )
})