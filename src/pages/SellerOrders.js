// src/pages/SellerOrders.js
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import API from '../api'; // Axios instance pointing to backend
import './SellerOrders.css';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [sellerId] = useState('seller123'); // 🔁 Replace this with dynamic seller ID

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get(`/orders?sellerId=${sellerId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [sellerId]);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
  const pendingOrders = totalOrders - deliveredOrders;

  const recentOrders = [...orders].reverse().slice(0, 4); // Last 4 orders

  return (
    <div>
      <NavBar />
      <div className="orders-dashboard">
        <h2 className="dashboard-title">Orders Overview</h2>

        <div className="orders-stats">
          <div className="card total">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
          <div className="card delivered">
            <h3>Delivered</h3>
            <p>{deliveredOrders}</p>
          </div>
          <div className="card pending">
            <h3>Pending</h3>
            <p>{pendingOrders}</p>
          </div>
        </div>

        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6).toUpperCase()}</td>
                  <td>{order.shopperName}</td>
                  <td
                    className={`status ${order.status === 'Delivered' ? 'delivered' : 'pending'}`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SellerOrders;
