import { useLogin } from "hooks/useLogin";
import "./Header.scss";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

const Header = () => {
    const { currentUser } = useLogin();
    return (
        <div className="Header">
            {currentUser ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
        </div>
    );
};

export default Header;
