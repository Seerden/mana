import { useRouteProps } from "../../hooks/routerHooks";
import UserSessions from "components/sessions/UserSessions";
import "./User.scss";

const User = () => {
	const { params } = useRouteProps();
	const username = params.username;

	return (
		<div className="PageWrapper">
			<div className="User">
				<div className="PageHeader UserHeader">User page for /u/{username}</div>
			</div>

			<section>
				<UserSessions />
			</section>
		</div>
	);
};

export default User;
