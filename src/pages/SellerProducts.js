import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './SellerProducts.css';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    alert("Welcome! To explore the website functionalities, please add your products manually.");
  }, []);

  const handleAddProduct = () => {
    navigate('/seller/add-product');
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${productId}`);
        alert("Product deleted");
        fetchProducts();
        console.log("Deleting product with ID:", productId);

      } catch (err) {
        console.error("Failed to delete product", err);
        alert("Delete failed");
        console.log("Deleting product with ID:", productId);

      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="seller-products-page">
        <h2 className="products-title">Your Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹ {product.price}</p>
              <p className="product-orders">{product.orders || 0} orders</p>

              {/* ✅ Add Delete Button */}
              <button className="delete-button" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          ))}

          {/* Add Product Card */}
          <div className="product-card add-product" onClick={handleAddProduct}>
            <div className="plus-icon">+</div>
            <p>Add New Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProducts;
