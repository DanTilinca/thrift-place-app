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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery with Navigation */}
        <div className="flex-1">
          <div className="relative">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg mb-4 cursor-pointer"
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
          <div className="flex gap-2 mt-2 overflow-x-auto">
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
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-900 text-3xl font-bold mb-4">${product.price}</p>
          <p className="text-sm text-gray-500 mb-2">Size: {product.size}</p>
          <p className="text-sm text-gray-500 mb-2">Condition: {product.condition}</p>
          <p className="text-sm text-gray-500 mb-4">Seller: {product.seller || 'Unknown'}</p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add to Favorites
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✕
          </button>
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
