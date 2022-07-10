import { isActive } from "helpers/link";
import { useRouteProps } from "hooks/routerHooks";
import { useLogin } from "hooks/useLogin";
import * as S from "./Header.style";

const HeaderLoggedIn = () => {
	const { currentUser, logout } = useLogin();
	const { location } = useRouteProps();

	return (
		<S.HeaderContent>
			<S.HeaderLogo>Mana</S.HeaderLogo>

			<S.HeaderNavLink $isActive={isActive(`/`, location)} to="/">
				Home
			</S.HeaderNavLink>

			<S.HeaderNavLink
				$isActive={isActive(`/u/${currentUser}`, location)}
				to={`/u/${currentUser}`}
			>
				My Profile
			</S.HeaderNavLink>

			<S.HeaderNavLink
				$isActive={isActive(`/u/${currentUser}/lists`, location)}
				to={`/u/${currentUser}/lists`}
			>
				My Lists
			</S.HeaderNavLink>

			<S.LogoutButton onClick={() => logout()}>log out</S.LogoutButton>
		</S.HeaderContent>
	);
};

export default HeaderLoggedIn;
