import { useLogin } from "hooks/useLogin";
import * as S from "./Header.style";
import HeaderLoggedIn from "./sub/HeaderLoggedIn";
import HeaderLoggedOut from "./sub/HeaderLoggedOut";

const Header = () => {
	const { currentUser } = useLogin();
	return (
		<S.HeaderWrapper>
			{currentUser ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
		</S.HeaderWrapper>
	);
};

export default Header;
