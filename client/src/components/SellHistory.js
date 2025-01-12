import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchSellHistory } from '../services/api';

const SellHistory = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getSellHistory = async () => {
      if (user) {
        try {
          const response = await fetchSellHistory(user.username);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching sell history:', error);
        }
      }
    };
    getSellHistory();
  }, [user]);

  if (!products.length) return <p>No products sold yet.</p>;

  return (
    <div>
      <h2>Sell History</h2>
      {products.map((product) => (
        <div key={product._id}>
          <p>{product.title}</p>
          <p>Sold to: {product.buyer}</p>
        </div>
      ))}
    </div>
  );
};

export default SellHistory;
