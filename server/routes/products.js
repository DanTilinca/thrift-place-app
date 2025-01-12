import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsBySeller, purchaseProduct, getSellHistory, getBuyHistory } from '../controllers/product.js';

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

// Route to modify product by id after purchase
router.put('/purchase/:id', purchaseProduct);

// Fetch a user Sell history
router.get('/history/sell', getSellHistory);

// Fetch a user Buy history
router.get('/history/buy', getBuyHistory);

export default router;
