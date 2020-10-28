import React, {memo, useState, useEffect, createContext } from 'react';
import { useLogState } from '../hooks/state';
import { storeUser } from '../hooks/auth';
export const LoginContext = createContext(null);

const LoginProvider = memo((props) => {
    /**
     * @todo    update this to do proper authentication, as it currently hard-codes 'seerden' as username
     */
    
    const [currentUser, setCurrentUser] = useState(storeUser(null, 'get'));

    const setUser = user => {
        setCurrentUser(user);
        storeUser(user, 'set')
    }

    useLogState('currentUser', currentUser)

    return (
        <LoginContext.Provider value={{...{currentUser, setUser} }}>
            {props.children}
        </LoginContext.Provider>
    )
})

export default LoginProvider;

/* handle user == null case for this and all dependent components */