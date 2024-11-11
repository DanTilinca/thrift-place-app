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

// Fetch all products with search, filters, and sorting
export const getAllProducts = async (req, res) => {
  const { search, minPrice, maxPrice, size, condition, sort } = req.query;

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

    // Sorting options
    let sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    if (sort === 'price_desc') sortOption.price = -1;

    // Fetch products based on query and sort options
    const products = await Product.find(query).sort(sortOption);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products' });
  }
};
