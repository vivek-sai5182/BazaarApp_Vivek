import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import NavBar from '../components/NavBar';
import './SellerProfile.css';

function SellerProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/seller/profile');
        if (res.data) {
          setProfile(res.data);
        } else {
          navigate('/seller/profile/edit');
        }
      } catch (err) {
        navigate('/seller/profile/edit');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) return null;

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <h2>Seller Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Shop Name:</strong> {profile.shopName}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <button className="edit-btn" onClick={() => navigate('/seller/profile/edit')}>Edit Profile</button>
      </div>
    </div>
  );
}

export default SellerProfile;
