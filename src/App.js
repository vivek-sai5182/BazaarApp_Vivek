// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BazaarLogin from './pages/BazaarLogin';
import SellerHome from './pages/SellerHome';
import SellerOrders from './pages/SellerOrders';
import SellerProducts from './pages/SellerProducts';
import SellerProfile from './pages/SellerProfile';
import SellerProfileEdit from './pages/SellerProfileEdit';
import AddProduct from "./pages/AddProducts";
import ShopperHome from './pages/ShopperHome';
import ShopperOrders from './pages/ShopperOrders';
import ShopperProfile from './pages/ShopperProfile';
import ShopperProfileEdit from './pages/ShopperProfileEdit';


function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<BazaarLogin />} />

        {/* Seller Routes */}
        <Route path="/seller/home" element={<SellerHome />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/profile" element={<SellerProfile />} />
        <Route path="/seller/add-product" element={<AddProduct />} />
        <Route path="/seller/profile/edit" element={<SellerProfileEdit />} />


        {/* Shopper Routes */}
        <Route path="/shopper/home" element={<ShopperHome />} />
        <Route path="/shopper/orders" element={<ShopperOrders />} />
        <Route path="/shopper/profile" element={<ShopperProfile />} />
        <Route path="/shopper/profile/edit" element={<ShopperProfileEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
