import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './SellerProfileEdit.css';

function SellerProfileEdit() {
  const [profile, setProfile] = useState({
    name: '',
    shopName: '',
    address: '',
    phone: '',
  });

  const navigate = useNavigate();

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/seller/profile');
        if (res.data) {
          setProfile(res.data);
        }
      } catch (err) {
        console.log("No existing profile found (probably first-time user).");
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save profile data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/seller/profile', profile);
      navigate('/seller/profile');
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Edit Seller Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="shopName"
          value={profile.shopName}
          onChange={handleChange}
          placeholder="Shop Name"
          required
        />
        <input
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Shop Address"
          required
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default SellerProfileEdit;
