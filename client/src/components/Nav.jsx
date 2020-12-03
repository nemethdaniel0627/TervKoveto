import React from 'react';
import { Link } from "react-router-dom";
import "../css/nav.css";
function Nav() {
    
    return (
        <nav>
            <h1>Logo</h1>
            <ul className="nav-link">
                <Link className="nav-item" to="/">
                    <li>Home</li>
                </Link>
                <Link className="nav-item" to="/about">
                    <li>About</li>
                </Link>
                <Link className="nav-item" to="/files/asd">
                    <li>Files</li>
                </Link>

            </ul>
        </nav>
    );
}

export default Nav;
