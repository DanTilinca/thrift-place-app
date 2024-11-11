import Product from '../models/Product.js';

// Create a new product
export const createProduct = async (req, res) => {
  const { title, description, price, size, condition, images } = req.body;

  try {
    const newProduct = await Product.create({
      title,
      description,
      price,
      size,
      condition,
      images,
      likes: 0,
      seller: req.userId,
      createdAt: new Date(),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create product' });
  }
};

// Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products' });
  }
};
