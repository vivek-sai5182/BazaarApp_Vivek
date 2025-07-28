// src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import bazaarLogo from '../pages/bazaarLogo.png';

// Optional page imports (not used directly in NavBar component, just for clarity)
import SellerHome from '../pages/SellerHome';
import SellerProducts from '../pages/SellerProducts';
import SellerOrders from '../pages/SellerOrders';
import SellerProfile from '../pages/SellerProfile';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img src={bazaarLogo} alt="Bazaar Logo" className="logo-img" />
        <h1 className="logoname">Bazaar!</h1>
      </div>

      <ul className="nav-links">
        <li><Link to="/seller/home">Home</Link></li>
        <li><Link to="/seller/products">Products</Link></li>
        <li><Link to="/seller/orders">Orders</Link></li>
        <li><Link to="/seller/profile">My Profile</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
