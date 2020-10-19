import React, { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import './css/Header.css';

const Header = memo(() => {
    const { user } = useContext(LoginContext);
    return (
        <div className="Header">
            <nav>
                <span id="Logo">Mana</span>
                <NavLink className="NavLink" to="/">Home</NavLink>
                <NavLink className="NavLink" to={`/u/${user}`}>My Profile</NavLink>
                <NavLink className="NavLink" to={`/u/${user}/lists`}>My Lists</NavLink>
                <NavLink className="NavLink" to={`/u/${user}/sets`}>My Sets</NavLink>

            </nav>
        </div>
    )
})

export default Header;