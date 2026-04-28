import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const API = axios.create({ baseURL: API_BASE_URL });

export const registerUser = (userData) => API.post('/users/signup', userData);
export const loginUser = (userData) => API.post('/users/signin', userData);
export const createProduct = (productData) => API.post('/products', productData);
export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const fetchProductsBySeller = (username) => API.post('/products/seller', { username });
export const purchaseProduct = (id, buyer) => API.put(`/products/purchase/${id}`, { buyer });
export const fetchSellHistory = (username) => API.get(`/products/history/sell`, { params: { username } });
export const fetchBuyHistory = (username) => API.get(`/products/history/buy`, { params: { username } });