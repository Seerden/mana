import { useLogin } from 'hooks/useLogin';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useRouteProps } from '../../hooks/routerHooks';
import './style/Header.scss';

const Header = () => {
    const { currentUser } = useLogin();

    return (
        <div className="Header">
            { currentUser ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
        </div>
    )
}

export default Header;

function isActive(to, location) {
    if (to === location.pathname) {
        return true;
    }
    return false;
}

const HeaderLoggedIn = () => {
    const { currentUser, logout } = useLogin();
    const { location } = useRouteProps();

    return (
        <nav>
            <span id="Logo">Mana</span>

            <NavLink
                className={`NavLink ${isActive(`/`, location) ? 'NavLink__active' : ''}`}
                to="/"
            >
                Home
            </NavLink>

            <NavLink
                className={`NavLink ${isActive(`/u/${currentUser}`, location) ? 'NavLink__active' : ''}`}
                to={`/u/${currentUser}`}
            >
                My Profile
            </NavLink>

            <NavLink
                className={`NavLink ${isActive(`/u/${currentUser}/lists`, location) ? 'NavLink__active' : ''}`}
                to={`/u/${currentUser}/lists`}
            >
                My Lists
            </NavLink>

            <NavLink
                className={`NavLink ${isActive(`/u/${currentUser}/sets`, location) ? 'NavLink__active' : ''}`}
                to={`/u/${currentUser}/sets`}
            >
                My Sets
            </NavLink>

            <button
                className="Header__logout"
                onClick={() => logout()}
            >
                log out
            </button>

        </nav>
    )
}

const HeaderLoggedOut = () => {
    const { location } = useRouteProps();

    return (
        <nav>
            <span id="Logo">Mana</span>
            <NavLink
                className={`NavLink ${isActive(`/`, location) ? 'NavLink__active' : ''}`}
                to="/"
            >
                Home
        </NavLink>
            <NavLink
                className={`NavLink ${isActive(`/login`, location) ? 'NavLink__active' : ''}`}
                to={`/login`}
            >
                Log in
        </NavLink>
            <NavLink
                className={`NavLink ${isActive(`/register`, location) ? 'NavLink__active' : ''}`}
                to={`/register`}
            >
                Register
        </NavLink>
        </nav>

    )
}


/*
    @todo: conditionally render based on if currentUser exists
*/