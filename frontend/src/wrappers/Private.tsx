import { useLogin } from "hooks/useLogin";
import React, { useContext, useState, useEffect } from "react";
import Login from '../components/login/Login';
import { useRouteProps } from '../hooks/routerHooks';

/**
 * Wrapper to hide components from unauthorized users.
 * @note   actual authorization is handled in LoginContext, useRequest, and on the backend
 * @todo   currently only checks if there is _any_ user, but we also want to check if the logged in user is the _right_ user
 * @usage  used by PrivateRoute component
 * @param {{component: React.NamedExoticComponent, rest: any}} props: props.component is a React/JSX component
 * @return {React.NamedExoticComponent} React component that displays login form or desired component based on auth state
 */
const Private = ({ component: Component, ...rest }) => {
    const [component, setComponent] = useState(<Component key={new Date()}/>);
    const { currentUser, isLoggedIn } = useLogin();
    const { params, location } = useRouteProps();

    useEffect(() => {
        setComponent(<Component key={new Date()} />)
    }, [Component, params, location, currentUser])

    return (
        <>
            { isLoggedIn
                ?
                (currentUser === params.username 
                    ? 
                        <>
                            { (component && component) }
                        </>
                    :
                        <div>You're not authorized to view this page.</div>
                )
                :
                <Login />
            }
        </>
    )
}

export default Private