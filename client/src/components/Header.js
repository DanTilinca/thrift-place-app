import React, { useState, useContext, useEffect } from 'react';
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdown-button')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle Sell button click
  const handleSellClick = () => {
    if (!user) {
      alert('Please log in to start selling!');
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
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
          <Link
            to="/products"
            className="py-2 px-4 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Buy
          </Link>
          <button
            onClick={handleSellClick}
            className="py-2 px-4 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Sell
          </button>
        </nav>

        {/* User Profile Section */}
        {user ? (
          <div className="relative dropdown-button">
            {/* User Avatar */}
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center font-bold border border-black"
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
                  <li>
                    <button
                      onClick={() => navigate('/history/sell')}
                      className="block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                    >
                      Sell History
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/history/buy')}
                      className="block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                    >
                      Buy History
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="py-2 px-4 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
