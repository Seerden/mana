import React, {useState, createContext } from 'react';

export const LoginContext = createContext(null);

const LoginProvider = (props) => {
    /**
     * @todo    update this to do proper authentication, as it currently hard-codes 'seerden' as username
     */
    
    const [currentUser, setCurrentUser] = useState('seerden')

    return (
        <LoginContext.Provider value={ {user: currentUser }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;
// @dev replace with proper auth