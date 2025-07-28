// src/pages/SellerHome.js
import React from 'react';
import NavBar from '../components/NavBar';
import './SellerHome.css'; 

function SellerHome() {
  // Dummy stats for now (replace with real data later)
  const monthlyOrders = 0;
  const monthlyRevenue = 0; 
  const totalProducts = 0;

  alert("Welcome! To explore the website functionalities, please add your products manually.");

  return (
    <div>
      <NavBar />
      <div className="seller-dashboard">
        <h2 className="dashboard-title">Seller Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card orders">
            <h3>Orders This Month</h3>
            <p>{monthlyOrders}</p>
          </div>
          <div className="card revenue">
            <h3>Revenue This Month</h3>
            <p>₹ {monthlyRevenue.toLocaleString()}</p>
          </div>
          <div className="card products">
            <h3>Total Products Listed</h3>
            <p>{totalProducts}products.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerHome;
