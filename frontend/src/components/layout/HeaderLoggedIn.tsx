import { isActive } from "helpers/link";
import { useRouteProps } from "hooks/routerHooks";
import { useLogin } from "hooks/useLogin";
import { NavLink } from "react-router-dom";

const HeaderLoggedIn = () => {
	const { currentUser, logout } = useLogin();
	const { location } = useRouteProps();

	return (
		<nav>
			<span id="Logo">Mana</span>
            
			<NavLink
				className={`NavLink ${
					isActive(`/`, location) ? "NavLink__active" : ""
				}`}
				to="/"
			>
				Home
			</NavLink>

			<NavLink
				className={`NavLink ${
					isActive(`/u/${currentUser}`, location) ? "NavLink__active" : ""
				}`}
				to={`/u/${currentUser}`}
			>
				My Profile
			</NavLink>

			<NavLink
				className={`NavLink ${
					isActive(`/u/${currentUser}/lists`, location) ? "NavLink__active" : ""
				}`}
				to={`/u/${currentUser}/lists`}
			>
				My Lists
			</NavLink>

			<button className="Header__logout" onClick={() => logout()}>
				log out
			</button>
		</nav>
	);
};

export default HeaderLoggedIn;
