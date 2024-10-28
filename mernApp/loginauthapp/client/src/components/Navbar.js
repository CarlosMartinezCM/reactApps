import React from 'react';
import './Navbar.css';

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='navbar'>
            {/* Nav content goes in here */}

            <div className='navbar-center'>
                <ul className='nav-links'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/PickEm">PickEm</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;