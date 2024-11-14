import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct, deleteProduct } from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '' });
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch product details
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
        });
        if (response.data.images.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    getProductDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, formData);
      alert('Product updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  // Handle delete product
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  if (!product) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6">Edit Product</h2>

      {/* Image Gallery */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <div className="relative mb-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  selectedImage === image ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Product Details</h3>
          <p className="text-gray-700 mb-2">
            <strong>Title:</strong> {product.title}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Size:</strong> {product.size}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Condition:</strong> {product.condition}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Created At:</strong> {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">Edit Product Information</h3>

        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Update Product
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-4"
        >
          Delete Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
