import { useLogin } from "hooks/useLogin";
import useReconcileSession from "../../../hooks/useReconcileSession";
import * as S from "./Header.style";
import HeaderLoggedIn from "./sub/HeaderLoggedIn";
import HeaderLoggedOut from "./sub/HeaderLoggedOut";

const Header = () => {
	useReconcileSession();
	const { currentUser } = useLogin();

	return (
		<S.HeaderWrapper>
			{currentUser ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
		</S.HeaderWrapper>
	);
};

export default Header;
