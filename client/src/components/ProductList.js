import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
