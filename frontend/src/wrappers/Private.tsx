import Login from "components/login/Login";
import { useLogin } from "hooks/useLogin";
import useRouteProps from "hooks/useRouteProps";
import { PropsWithChildren } from "react";

const Private = (props: PropsWithChildren<any>): any => {
	const { currentUser, isLoggedIn } = useLogin();
	const { params } = useRouteProps();

	if (isLoggedIn && currentUser === params.username) {
		return props.children;
	} else {
		return <Login />;
	}
};

export default Private;
