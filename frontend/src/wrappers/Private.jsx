import React, { useContext, useState, useEffect } from "react";
import Login from '../components/login/Login';
import { LoginContext } from '../context/LoginContext';
// import { useRouteProps } from  '../hooks/routerHooks';
// import { useLogState } from "../hooks/state";

 /**
  * Wrapper to hide components from unauthorized users.
  * @note actual authorization is handled in LoginContext
  * @usage used by PrivateRoute component
  * @param {*} props: props.component is a React/JSX component
  * @return {React.NamedExoticComponent} React component that displays login form or desired component based on auth state
  */
const Private = ({ component: Component, ...rest}) => {
    const { currentUser } = useContext(LoginContext);
    const [isLoggedIn, setIsLoggedIn] = useState(currentUser ? true : false)

    useEffect(() => {
        setIsLoggedIn(currentUser ? true : false)
    }, [currentUser])

    return (
        <>
            { isLoggedIn
                ? 
                    <Component/>    
                : 
                    <Login />
            }
        </>
    )
}

export default Private