import React, {memo, useState, useEffect, createContext } from 'react';
import { useLogState } from '../hooks/state';

export const LoginContext = createContext(null);

const LoginProvider = memo((props) => {
    /**
     * @todo    update this to do proper authentication, as it currently hard-codes 'seerden' as username
     */
    
    const [currentUser, setCurrentUser] = useState(() => {'seerden'});
    useEffect(() => {
        setCurrentUser('seerden')
    }, [])

    useLogState('username', currentUser, setCurrentUser)


    return (
        <LoginContext.Provider value={ {user: currentUser }}>
            {props.children}
        </LoginContext.Provider>
    )
})

export default LoginProvider;
// @dev replace with proper auth