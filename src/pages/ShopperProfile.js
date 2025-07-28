import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import SNavBar from '../components/SNavBar';
import './ShopperProfile.css';

function ShopperProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/shopper/profile');
        if (res.data) {
          setProfile(res.data);
        } else {
          navigate('/shopper/profile/edit');
        }
      } catch (err) {
        navigate('/shopper/profile/edit');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) return null;

  return (
    <div>
      <SNavBar />
      <div className="shopper-profile-container">
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <button
          className="edit-btn"
          onClick={() => navigate('/shopper/profile/edit')}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ShopperProfile;
