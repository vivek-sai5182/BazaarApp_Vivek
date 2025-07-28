// src/pages/BazaarLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './bazaarLogin.css';
import bazaarLogo from './bazaarLogo.png'; // Make sure this file exists

function BazaarLogin() {
  const navigate = useNavigate();

  return (
    <div className="bazaar-login-body">
      <img src={bazaarLogo} alt="bazaar Logo" className="logo" />
      <h1 className="logoname">Bazaar!</h1>
      <h4 className="logotag">Local Shops, Global Access.</h4>

      <div className="container">
        <h1>Welcome to Bazaar!</h1>
        <p className="tagline">Choose your role to continue</p>

        <div className="button-group">
          <button className="role-button shopper" onClick={() => navigate('/shopper/home')}>
            I'm a Shopper
          </button>
          <button className="role-button seller" onClick={() => navigate('/seller/home')}>
            I'm a Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default BazaarLogin;
