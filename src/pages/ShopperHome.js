import React, { useEffect, useState } from 'react';
import API from '../api';
import SNavBar from '../components/SNavBar';
import './ShopperHome.css';

function ShopperHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
  try {
    await API.post('/shopper/cart', {
      productId,
      shopperName: 'Guest',
    });
    alert('Added to cart!');
  } catch (err) {
    console.error('Add to cart failed:', err);
    alert('Failed to add.');
  }
};


  const handleOrderNow = async (productId) => {
    try {
      await API.post('/orders', { productId });
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order.');
    }
  };

  return (
    <div>
      <SNavBar />
      <div className="shopper-home-container">
        <h2>Available Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <div className="product-buttons">
                <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                <button onClick={() => handleOrderNow(product._id)}>Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopperHome;
