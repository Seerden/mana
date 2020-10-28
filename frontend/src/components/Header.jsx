import React, { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import './css/Header.scss';

const Header = memo(() => {
    const { currentUser } = useContext(LoginContext);
    return (
        <div className="Header">
            <nav>
                <span id="Logo">Mana</span>
                <NavLink className="NavLink" to="/">Home</NavLink>
                <NavLink className="NavLink" to={`/u/${currentUser}`}>My Profile</NavLink>
                <NavLink className="NavLink" to={`/u/${currentUser}/lists`}>My Lists</NavLink>
            </nav>
        </div>
    )
})

export default Header;

/* 
    @todo: conditionally render based on if currentUser exists
*/