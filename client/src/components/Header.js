// client/src/components/Header.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-2xl font-bold">
          Thrift Place
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-4">
          <Link to="/products" className="hover:underline">
            Buy
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Sell
          </Link>
        </nav>

        {/* User Profile Section */}
        {user ? (
          <div className="relative">
            {/* User Avatar */}
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center font-bold"
            >
              {user.username.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => navigate('/profile')}
                      className="block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:underline">
            Log In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
