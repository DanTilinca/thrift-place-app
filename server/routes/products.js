import express from 'express';
import { createProduct, getAllProducts, getProductById, getProductsBySeller } from '../controllers/product.js';

const router = express.Router();

// Route to create a product
router.post('/', createProduct);

// Route to fetch all products
router.get('/', getAllProducts);

// Route to fetch a single product by id
router.get('/:id', getProductById);

router.post('/seller', getProductsBySeller);

export default router;
