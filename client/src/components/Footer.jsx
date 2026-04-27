import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-base-300/70 bg-base-100">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-base-content">Thrift Place</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-base-content/65">
            A modern marketplace for premium pre-loved fashion. Buy better pieces and sell with confidence.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/50">Company</p>
          <div className="mt-3 space-y-2">
            <Link className="block text-sm text-base-content/70 transition-colors duration-200 hover:text-base-content" to="/about">
              About us
            </Link>
            <Link className="block text-sm text-base-content/70 transition-colors duration-200 hover:text-base-content" to="/contact">
              Contact
            </Link>
            <Link className="block text-sm text-base-content/70 transition-colors duration-200 hover:text-base-content" to="/privacy-policy">
              Privacy policy
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/50">Marketplace</p>
          <div className="mt-3 space-y-2">
            <Link className="block text-sm text-base-content/70 transition-colors duration-200 hover:text-base-content" to="/products">
              Browse products
            </Link>
            <Link className="block text-sm text-base-content/70 transition-colors duration-200 hover:text-base-content" to="/dashboard">
              Start selling
            </Link>
            <Link className="block text-sm text-base-content/70 transition-colors duration-200 hover:text-base-content" to="/history/buy">
              Buy history
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300/70 py-4">
        <p className="text-center text-xs text-base-content/55">© {new Date().getFullYear()} Thrift Place. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

