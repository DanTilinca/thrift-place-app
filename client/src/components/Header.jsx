import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdown-button')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSellClick = () => {
    if (!user) {
      alert('Please log in to start selling!');
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  const userInitial = (
    user?.username?.trim()?.charAt(0) ||
    user?.name?.trim()?.charAt(0) ||
    user?.email?.trim()?.charAt(0) ||
    'U'
  ).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/70 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-base-content sm:text-2xl">
          Thrift Place
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          <Link
            to="/products"
            className="btn btn-ghost rounded-xl border border-base-300/80 px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-base-200 hover:shadow-md active:scale-95"
          >
            Buy
          </Link>
          <button
            onClick={handleSellClick}
            className="btn btn-primary rounded-xl px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            Sell
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="group relative flex h-10 w-[74px] items-center rounded-full border border-base-300/80 bg-base-100 px-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <span
              className={`absolute h-8 w-8 rounded-full bg-base-200 shadow-sm transition-all duration-300 ${
                isDark ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
            <span className="relative z-10 flex w-full items-center justify-between px-1 text-base-content/70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 8a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 13H4a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Zm12.657 6.243a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414Zm-9.193-9.193a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 1 1 7.757 7.93l.707.707a1 1 0 0 1 0 1.414Zm9.193-2.121a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0ZM8.464 16.121a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M20.742 13.045a8 8 0 1 1-9.787-9.787 1 1 0 0 1 1.263 1.263A6 6 0 0 0 19.48 11.78a1 1 0 0 1 1.262 1.264Z" />
              </svg>
            </span>
          </button>

          {user ? (
            <div className="relative dropdown-button">
              <button
                onClick={toggleDropdown}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-sm font-bold text-base-content shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
              >
                {userInitial}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-base-300/70 bg-base-100 p-2 shadow-md">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => navigate('/profile')}
                        className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-base-content transition-colors duration-200 hover:bg-base-200"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate('/history/sell')}
                        className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-base-content transition-colors duration-200 hover:bg-base-200"
                      >
                        Sell History
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate('/history/buy')}
                        className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-base-content transition-colors duration-200 hover:bg-base-200"
                      >
                        Buy History
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-error transition-colors duration-200 hover:bg-error/10"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-ghost rounded-xl border border-base-300/80 px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-base-200 hover:shadow-md active:scale-95"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 pb-3 sm:hidden sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="btn btn-ghost flex-1 rounded-xl border border-base-300/80 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-base-200 hover:shadow-md active:scale-95"
        >
          Buy
        </Link>
        <button
          onClick={handleSellClick}
          className="btn btn-primary flex-1 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          Sell
        </button>
      </div>
    </header>
  );
};

export default Header;

