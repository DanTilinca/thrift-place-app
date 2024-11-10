import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.js';

const router = express.Router();

// Route to create a product
router.post('/', createProduct);

// Route to fetch all products
router.get('/', getAllProducts);

export default router;
