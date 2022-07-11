import Login from "components/login/Login";
import { useLogin } from "hooks/useLogin";
import useRouteProps from "hooks/useRouteProps";

const Private = ({ children }) => {
	const { currentUser, isLoggedIn } = useLogin();
	const { params } = useRouteProps();

	if (isLoggedIn && currentUser === params.username) {
		return children;
	} else {
		return <Login />;
	}
};

export default Private;
