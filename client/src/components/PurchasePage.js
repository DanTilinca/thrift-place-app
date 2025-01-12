import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, purchaseProduct } from '../services/api';

const PurchasePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    city: '',
    zip: '',
    phone: '',
    paymentMethod: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    getProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePurchase = async () => {
    const { firstName, lastName, address, country, city, zip, phone, paymentMethod } = formData;

    if (!firstName || !lastName || !address || !country || !city || !zip || !phone || !paymentMethod) {
      alert('Please complete all fields before proceeding.');
      return;
    }

    try {
      await purchaseProduct(id);
      alert('Purchase completed successfully!');
      navigate('/'); // Redirect to the landing page or a confirmation page
    } catch (error) {
      console.error('Error completing purchase:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  if (!product) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Complete Your Purchase</h2>

      {/* Product Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-bold mb-4">Product Details</h3>
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-24 h-24 object-cover rounded-lg border"
          />
          {/* Product Details */}
          <div>
            <p className="text-gray-700 mb-2">
              <strong>Title:</strong> {product.title}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Size:</strong> {product.size}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Condition:</strong> {product.condition}
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">Shipping Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* ZIP Code */}
          <div>
            <label className="block mb-2">ZIP Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4">
          <label className="block mb-2">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Complete Purchase */}
        <button
          onClick={handlePurchase}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 mt-6"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default PurchasePage;
