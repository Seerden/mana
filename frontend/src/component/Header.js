import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import './css/Header.css';

const Header = memo(() => {
    return (
        <div className="Header">
            <nav>
                <span id="Logo">Mana</span>
                <NavLink className="NavLink" to="/">Home</NavLink>
                <NavLink className="NavLink" to="/lists/new">New List</NavLink>

            </nav>
        </div>
    )
})

export default Header;