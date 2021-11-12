import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";
import { useLogin } from "hooks/useLogin";
import "./Header.scss";

const Header = () => {
	const { currentUser } = useLogin();
	return (
		<div className="Header">
			{currentUser ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
		</div>
	);
};

export default Header;

