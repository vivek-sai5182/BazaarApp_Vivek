import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Axios instance
import NavBar from '../components/NavBar';
import './AddProduct.css';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image);

      await API.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product added successfully!');
       navigate('/seller/products');
    } catch (err) {
      console.error('Failed to add product:', err);
      alert('Error adding product. Check console.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="add-product-page">
        <h2>Add New Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </label>
          <label>
            Price (₹):
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              required
            />
          </label>
          <label>
            Product Image:
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </label>
          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
