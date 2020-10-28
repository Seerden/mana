import React, { useContext } from "react";
import Login from '../components/login/Login';
import { LoginContext } from '../context/LoginContext';
import { useRouteProps } from  '../hooks/routerHooks';
import { useLogState } from "../hooks/state";

 /**
  * Wrapper to hide components from unauthorized users.
  * @note actual authorization is handled in LoginContext
  * @usage used by PrivateRoute component
  * @param {*} props: props.component is a React/JSX component
  * @return {React.NamedExoticComponent} React component that displays login form or desired component based on auth state
  */
const Private = ({ component: Component, ...rest}) => {
    const { currentUser } = useContext(LoginContext);
    console.log('current user from private.jsx', currentUser);
    const { params } = useRouteProps();
    useLogState('params', params);
    
    return (
        <>
            { currentUser
                ? 
                    <Component/>    
                : 
                    <Login />
            }
        </>
    )
}

export default Private