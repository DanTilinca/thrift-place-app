// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';

// main pages
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import AddProduct from './components/AddProduct';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import BuyPage from './components/BuyPage';
import ProductDetails from './components/ProductDetails';
import EditProduct from './components/EditProduct';

//footer pages
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="flex-glow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products" element={<BuyPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
