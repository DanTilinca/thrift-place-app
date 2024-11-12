import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  images: [{ type: String }],
  likes: { type: Number, default: 0 },
  seller: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
