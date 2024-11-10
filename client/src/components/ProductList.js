import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Product Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-900 font-bold mb-2">${product.price}</p>
            <p className="text-sm text-gray-500">Size: {product.size}</p>
            <p className="text-sm text-gray-500">Condition: {product.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
