import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { fetchProductsBySeller } from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch user's products
  useEffect(() => {
    const getUserProducts = async () => {
      if (user) {
        try {
          const response = await fetchProductsBySeller(user.username);
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching user products:', error);
        }
      }
    };
    getUserProducts();
  }, [user]);

  // Handle Add Product button click
  const handleAddProduct = () => {
    navigate('/add-product');
  };

  // Handle Edit button click
  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Dashboard</h2>

      {/* Add Product Button */}
      <button
        onClick={handleAddProduct}
        className="mb-6 py-2 px-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Add New Product
      </button>

      {/* User's Product Listings */}
      {products.length === 0 ? (
        <p className="text-gray-500">You have no products listed.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className={`relative bg-white p-4 rounded-lg shadow-md flex flex-col justify-between ${
                product.buyer ? 'opacity-75' : ''
              }`}
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                {/* Sold Badge */}
                {product.buyer && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    SOLD
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-grow mb-4">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-900 font-bold">${product.price}</p>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => handleEditProduct(product._id)}
                className="mt-auto py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
