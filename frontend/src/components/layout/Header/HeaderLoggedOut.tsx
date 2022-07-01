import { isActive } from "helpers/link";
import { useRouteProps } from "hooks/routerHooks";
import { NavLink } from "react-router-dom";

const HeaderLoggedOut = () => {
    const { location } = useRouteProps();
    return (
        <nav>
            <span id="Logo">Mana</span>

            <NavLink
                className={`NavLink ${isActive(`/`, location) ? "NavLink__active" : ""}`}
                to="/"
            >
                Home
            </NavLink>

            <NavLink
                className={`NavLink ${
                    isActive(`/login`, location) ? "NavLink__active" : ""
                }`}
                to={`/login`}
            >
                Log in
            </NavLink>

            <NavLink
                className={`NavLink ${
                    isActive(`/register`, location) ? "NavLink__active" : ""
                }`}
                to={`/register`}
            >
                Register
            </NavLink>
        </nav>
    );
};

export default HeaderLoggedOut;
