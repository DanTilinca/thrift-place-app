import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <p>© {new Date().getFullYear()} Thrift Place. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/about" className="hover:underline">
              About Us
            </a>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
