import React, {useEffect, useState, createContext } from 'react';

export const LoginContext = createContext(null);

const LoginProvider = (props) => {
    const [currentUser, setCurrentUser] = useState('seerden')

    return (
        <LoginContext.Provider value={ {user: currentUser }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;
// @dev replace with proper auth