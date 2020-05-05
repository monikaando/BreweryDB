import React from 'react';
import {Link} from "react-router-dom";
import '../styles/Navbar.scss';

export default function Navbar() {
    return (
        <div className="nav-buttons">
                    <Link to={"/brewery"} className="button">Breweries per country</Link>
                    <div className="home">
                    <Link to={"/"}> <img src="/white-home-icon.png" alt="TapApp-homepage"/></Link>
                    </div>
                    <Link to={"/brewery"} className="button">Find a beer</Link>
        </div>
    )
}