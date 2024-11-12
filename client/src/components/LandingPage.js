// client/src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-500 text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Thrift Place</h1>
        <p className="text-lg mb-6">
          Discover amazing deals on second-hand clothes or start selling your own today!
        </p>
        <button
          onClick={() => navigate('/products')}
          className="py-2 px-6 bg-white text-blue-500 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Explore Now
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sell Clothes Feature */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sell Your Clothes</h2>
          <p className="text-gray-700 mb-6">
            Got clothes you no longer wear? List them on Thrift Place and start earning money
            today. It’s easy, fast, and secure!
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Start Selling
          </button>
        </div>

        {/* Buy Clothes Feature */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Buy Quality Clothes</h2>
          <p className="text-gray-700 mb-6">
            Browse our vast collection of second-hand clothes at unbeatable prices. Find unique
            pieces and great deals every day.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gray-200 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "I found so many great deals on Thrift Place! It’s now my go-to place for shopping
              clothes online."
            </p>
            <p className="font-semibold">- Jane Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "Selling clothes on Thrift Place was super easy. I made extra cash and cleared out my
              closet!"
            </p>
            <p className="font-semibold">- John Smith</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "Amazing variety and great prices. I love shopping here and finding unique pieces."
            </p>
            <p className="font-semibold">- Emma Wilson</p>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-blue-600 text-white py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Seasonal Sale: Up to 50% Off!</h2>
        <p className="text-lg mb-6">Don’t miss out on our biggest sale of the year. Shop now and save big!</p>
        <button
          onClick={() => navigate('/products')}
          className="py-2 px-6 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Shop the Sale
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
