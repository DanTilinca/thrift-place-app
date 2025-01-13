import React, { useState, useContext } from 'react';
import { createProduct } from '../services/api';
import AuthContext from '../context/AuthContext';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    size: '',
    condition: '',
    category: '',
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useContext(AuthContext);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image uploads
  const handleImageUpload = async (files) => {
    setUploading(true);
    const uploadedImages = [];
    const imagePreviews = [];

    for (let file of files) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'thriftplace');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dtvjxmhhr/image/upload',
          {
            method: 'POST',
            body: data,
          }
        );
        const result = await response.json();
        uploadedImages.push(result.secure_url);
        imagePreviews.push(URL.createObjectURL(file));
      } catch (error) {
        console.error('Image upload error:', error);
        alert('Failed to upload image');
      }
    }

    setImages(uploadedImages);
    setPreviews(imagePreviews);
    setUploading(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add a product');
      return;
    }

    const productData = {
      ...formData,
      images,
      seller: user.username,
    };

    try {
      await createProduct(productData);
      alert('Product added successfully!');
      setFormData({ title: '', description: '', price: '', size: '', condition: '', category: '' });
      setImages([]);
      setPreviews([]);
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
              className="w-full p-2 border rounded-md focus:outline-none"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Product Description"
              className="w-full p-2 border rounded-md focus:outline-none"
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
              className="w-full p-2 border rounded-md focus:outline-none"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="size"
              className="w-full p-2 border rounded-md focus:outline-none"
              value={formData.size}
              onChange={handleChange}
              required
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="condition"
              className="w-full p-2 border rounded-md focus:outline-none"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="category"
              className="w-full p-2 border rounded-md focus:outline-none"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Dress">Dress</option>
              <option value="Skirt">Skirt</option>
              <option value="Shirt">Shirt</option>
              <option value="Tshirt">Tshirt</option>
              <option value="Jacket">Jacket</option>
              <option value="Pants">Pants</option>
              <option value="Shorts">Shorts</option>
              <option value="Coat">Coat</option>
              <option value="Sweater">Sweater</option>
              <option value="Blouse">Blouse</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {previews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? 'Uploading Images...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
