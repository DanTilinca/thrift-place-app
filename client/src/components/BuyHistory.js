import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchBuyHistory } from '../services/api';

const BuyHistory = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getBuyHistory = async () => {
      if (user) {
        try {
          const response = await fetchBuyHistory(user.username);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching buy history:', error);
        }
      }
    };
    getBuyHistory();
  }, [user]);

  if (!user) {
    return <div className="text-center py-20">Please log in to view your purchase history.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Purchase History</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products purchased yet.</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center bg-white p-6 rounded-lg shadow-lg"
            >
              {/* Product Image */}
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-32 h-32 object-cover rounded-md border"
              />
              {/* Product Details */}
              <div className="ml-6">
                <h3 className="text-2xl font-semibold">{product.title}</h3>
                <p className="text-gray-700">
                  <strong>Seller:</strong> {product.seller}
                </p>
                <p className="text-gray-900 font-bold text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyHistory;
