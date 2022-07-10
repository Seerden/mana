import { isActive } from "helpers/link";
import useRouteProps from "hooks/useRouteProps";
import * as S from "./Header.style";

const HeaderLoggedOut = () => {
	const { location } = useRouteProps();
	return (
		<S.HeaderContent>
			<S.HeaderLogo>Mana</S.HeaderLogo>

			<S.HeaderNavLink
				className={`NavLink ${isActive(`/`, location) ? "NavLink__active" : ""}`}
				to="/"
			>
				Home
			</S.HeaderNavLink>

			<S.HeaderNavLink
				className={`NavLink ${isActive(`/login`, location) ? "NavLink__active" : ""}`}
				to={`/login`}
			>
				Log in
			</S.HeaderNavLink>

			<S.HeaderNavLink
				className={`NavLink ${
					isActive(`/register`, location) ? "NavLink__active" : ""
				}`}
				to={`/register`}
			>
				Register
			</S.HeaderNavLink>
		</S.HeaderContent>
	);
};

export default HeaderLoggedOut;
