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

  if (!products.length) return <p>No products purchased yet.</p>;

  return (
    <div>
      <h2>Buy History</h2>
      {products.map((product) => (
        <div key={product._id}>
          <p>{product.title}</p>
          <p>Seller: {product.seller}</p>
        </div>
      ))}
    </div>
  );
};

export default BuyHistory;
