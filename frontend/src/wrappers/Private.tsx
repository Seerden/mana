import { useLogin } from "hooks/useLogin";
import { useState, useEffect } from "react";
import Login from 'components/login/Login';
import { useRouteProps } from 'hooks/routerHooks';

/**
 * Wrapper to hide components from unauthorized users.
 * @note            actual authorization is handled in LoginContext, useRequest, and on the backend
 * @usage           used by PrivateRoute component
 * @return          React component that displays login form or desired component based on auth state
 */
const Private = ({ component: Component, ...rest }: { component: any }) => {
    const [component, setComponent] = useState<JSX.Element>(<Component key={new Date()}/>);
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