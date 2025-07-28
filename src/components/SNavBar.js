
import React from 'react';
import {Link} from 'react-router-dom';
//import { useLocation } from 'react-router-dom';
import './NavBar.css';
import bazaarLogo from "../pages/bazaarLogo.png";

const NavBar = ()=>{
    //const location = useLocation();

    return(
        <nav className='navbar'>
            <div className="navbar-logo-container">
                <img src={bazaarLogo} alt="logoimage"className="logo-img"/>
                <h1 className="logoname">Bazaar!</h1>
            </div>
            <ul className="nav-links">
              <li><Link to="/shopper/home">Home</Link></li>
              <li><Link to="/shopper/orders">Orders</Link></li>
              <li><Link to="/shopper/profile">Profile</Link></li>
            </ul>
        </nav>
    );
}
export default NavBar;
