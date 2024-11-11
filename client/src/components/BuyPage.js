import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';

const BuyPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [sort, setSort] = useState('');
  const navigate = useNavigate();

  // Fetch products with filters
  const getProducts = useCallback(async () => {
    const params = { search, minPrice, maxPrice, size, condition, sort };
    const response = await fetchProducts(params);
    setProducts(response.data);
  }, [search, minPrice, maxPrice, size, condition, sort]);
  
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Find Your Next Outfit</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block mb-2">Min Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Max Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Size</label>
          <select
            className="w-full p-2 border rounded-md"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Condition</label>
          <select
            className="w-full p-2 border rounded-md"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">All Conditions</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <label className="block mb-2">Sort By</label>
        <select
          className="w-full p-2 border rounded-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            {/* Product Image */}
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}

            {/* Product Details */}
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-900 font-bold mb-2">${product.price}</p>
            <p className="text-sm text-gray-500">Size: {product.size}</p>
            <p className="text-sm text-gray-500">Condition: {product.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyPage;
