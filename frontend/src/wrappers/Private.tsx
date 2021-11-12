import Login from "components/login/Login";
import { useRouteProps } from "hooks/routerHooks";
import { useLogin } from "hooks/useLogin";

const Private = ({ children }) => {
    const { currentUser, isLoggedIn } = useLogin();
    const { params } = useRouteProps();

    if (isLoggedIn && (currentUser === params.username)) {
        return children
    } else {
        return <Login />
    };
}

export default Private