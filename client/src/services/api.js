import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const createProduct = (productData) => API.post('/products', productData);
export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProductById = (id) => API.get(`/products/${id}`);
