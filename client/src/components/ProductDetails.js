import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch product details
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

  if (!product) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  // Handle image navigation
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Handle full-screen modal view
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Image Gallery and Product Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Image Gallery */}
        <div className="flex-1">
          <div className="relative mb-4">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={openModal}
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 bg-white rounded-full p-2 shadow-md"
            >
              ◀
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 bg-white rounded-full p-2 shadow-md"
            >
              ▶
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  selectedImageIndex === index ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-900 text-3xl font-bold mb-4">${product.price}</p>
          <div className="text-gray-700 mb-4">
            <p className="mb-2">
              <strong>Size:</strong> {product.size}
            </p>
            <p className="mb-2">
              <strong>Condition:</strong> {product.condition}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Created At:</strong> {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add to Favorites
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-bold mb-4">Product Description</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Seller Information */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Seller Information</h3>
        <div className="text-gray-700">
          <p className="mb-2">
            <strong>Seller:</strong> {product.seller || 'Unknown'}
          </p>
          <p className="mb-2">
            <strong>Contact the Seller:</strong> Please use the chat feature to ask questions about this product.
          </p>
        </div>
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={product.images[selectedImageIndex]}
            alt={`Full view of ${product.title}`}
            className="w-3/4 h-3/4 object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
