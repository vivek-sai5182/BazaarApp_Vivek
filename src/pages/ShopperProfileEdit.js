import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './ShopperProfileEdit.css';

function ShopperProfileEdit() {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/shopper/profile');
        if (res.data) {
          setProfile(res.data);
        }
      } catch (err) {
        console.log("No existing profile found (probably first-time shopper).");
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Submit profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/shopper/profile', profile);
      navigate('/shopper/profile');
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="shopper-profile-edit-container">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ShopperProfileEdit;
