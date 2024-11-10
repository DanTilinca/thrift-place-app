// client/src/components/AddProduct.js
import React, { useState } from 'react';
import { createProduct } from '../services/api';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    size: '',
    condition: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(formData);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Product Description"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="size"
              placeholder="Size (e.g., M, L)"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="condition"
              placeholder="Condition (e.g., New, Used)"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={formData.condition}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
