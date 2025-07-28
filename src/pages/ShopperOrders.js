import React, { useEffect, useState } from 'react';
import API from '../api';
import SNavBar from '../components/SNavBar';
import './ShopperOrders.css';

function ShopperOrders() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCart();
    fetchOrders();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get('/shopper/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get('/shopper/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const handleOrderAll = async () => {
    try {
      for (const item of cart) {
        await API.post('/orders', {
          productId: item.productId._id,
          quantity: 1,
          shopperName: 'Guest Shopper',
          address: 'Guest Address',
        });
      }

      await API.delete('/shopper/cart/clear');
      setCart([]);
      alert('All items ordered successfully!');
      fetchOrders();
    } catch (err) {
      console.error('Failed to order all items:', err);
    }
  };

  return (
    <div>
      <SNavBar />
      <div className="orders-container">
        <h2>🛒 Your Cart</h2>
        <div className="orders-grid">
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="order-card">
                <img
                  src={`http://localhost:5000/uploads/${item.productId.image}`}
                  alt={item.productId.name}
                />
                <h3>{item.productId.name}</h3>
                <p>₹{item.productId.price}</p>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <button className="order-all-btn" onClick={handleOrderAll}>
            Order All
          </button>
        )}

        <h2>📦 Your Orders</h2>
        <div className="orders-grid">
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-card">
                {order.productId && (
                  <>
                    <img
                      src={`http://localhost:5000/uploads/${order.productId.image}`}
                      alt={order.productId.name}
                    />
                    <h3>{order.productId.name}</h3>
                    <p>₹{order.productId.price}</p>
                    <p className="status">Status: Will be delivered soon</p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopperOrders;
