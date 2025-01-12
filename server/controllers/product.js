import Product from '../models/Product.js';

// Create a new product
export const createProduct = async (req, res) => {
  const { title, description, price, size, condition, images, category, seller } = req.body;

  try {
    const newProduct = await Product.create({
      title,
      description,
      price,
      size,
      condition,
      images,
      seller,
      category,
      likes: 0,
      createdAt: new Date(),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product in MongoDB:', error);
    res.status(500).json({ message: 'Unable to create product', error: error.message });
  }
};

// Fetch all products with search, filters, and sorting
export const getAllProducts = async (req, res) => {
  const { search, minPrice, maxPrice, size, condition, sort, category, page = 1, limit = 10 } = req.query;

  try {
    // Build the query object
    const query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by price range
    if (minPrice) query.price = { ...query.price, $gte: parseFloat(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };

    // Filter by size
    if (size) query.size = size;

    // Filter by condition
    if (condition) query.condition = condition;

    // Filter by category
    if (category) query.category = category;

    // Sorting options
    let sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    if (sort === 'price_desc') sortOption.price = -1;

    // Pagination
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortOption).skip(skip).limit(parseInt(limit));

    res.status(200).json({ products, total });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products' });
  }
};

// Fetch a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch product details' });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch products by seller
export const getProductsBySeller = async (req, res) => {
  const { username } = req.body;

  try {
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // Query the database using the username from the request body
    const products = await Product.find({ seller: username });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this seller' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products by seller:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete product by ID (purchase completion)
export const purchaseProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product purchased successfully', product });
  } catch (error) {
    console.error('Error during purchase:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
