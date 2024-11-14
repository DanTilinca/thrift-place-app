import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsBySeller } from '../controllers/product.js';

const router = express.Router();

// Route to create a product
router.post('/', createProduct);

// Route to fetch all products
router.get('/', getAllProducts);

// Route to fetch a single product by id
router.get('/:id', getProductById);

// Route to update a product info by id
router.put('/:id', updateProduct);

// Route to delete a product by id
router.delete('/:id', deleteProduct);

// Route to fetch products by seller
router.post('/seller', getProductsBySeller);

export default router;
