import React, { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import './style/Header.scss';

const Header = () => {
    const { currentUser } = useContext(LoginContext);

    return (
        <div className="Header">
            { currentUser ? <HeaderLoggedIn/> : <HeaderLoggedOut/> }
        </div>
    )
}

export default Header;

const HeaderLoggedIn = () => {
    const { currentUser, logout } = useContext(LoginContext);

    return (
        <nav>
            <span id="Logo">Mana</span>
            <NavLink className="NavLink" to="/">Home</NavLink>
            <NavLink className="NavLink" to={`/u/${currentUser}`}>My Profile</NavLink>
            <NavLink className="NavLink" to={`/u/${currentUser}/lists`}>My Lists</NavLink>
            
            <button 
                className="Header__logout"
                onClick={() => logout()}
            >
                log out
            </button>
        </nav>
    )
}

const HeaderLoggedOut = () =>
    <nav>
        <span id="Logo">Mana</span>
        <NavLink className="NavLink" to="/">Home</NavLink>
        <NavLink className="NavLink" to={`/login`}>Log in</NavLink>
        <NavLink className="NavLink" to={`/register`}>Register</NavLink>
    </nav>


/*
    @todo: conditionally render based on if currentUser exists
*/