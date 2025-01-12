import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const createProduct = (productData) => API.post('/products', productData);
export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const fetchProductsBySeller = (username) => API.post('/products/seller', { username });
export const purchaseProduct = (id, buyer) => API.put(`/products/purchase/${id}`, { buyer });
export const fetchSellHistory = (username) => API.get(`/products/history/sell`, { params: { username } });
export const fetchBuyHistory = (username) => API.get(`/products/history/buy`, { params: { username } });