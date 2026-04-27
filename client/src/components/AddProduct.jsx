import React, { useState, useContext } from 'react';
import { createProduct } from '../services/api';
import AuthContext from '../context/AuthContext';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    size: '',
    condition: '',
    category: '',
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (files) => {
    setUploading(true);
    const uploadedImages = [];
    const imagePreviews = [];

    for (let file of files) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'thriftplace');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dtvjxmhhr/image/upload', {
          method: 'POST',
          body: data,
        });
        const result = await response.json();
        uploadedImages.push(result.secure_url);
        imagePreviews.push(URL.createObjectURL(file));
      } catch (error) {
        console.error('Image upload error:', error);
        alert('Failed to upload image');
      }
    }

    setImages(uploadedImages);
    setPreviews(imagePreviews);
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add a product');
      return;
    }

    const productData = {
      ...formData,
      images,
      seller: user.username,
    };

    try {
      setSubmitting(true);
      await createProduct(productData);
      alert('Product added successfully!');
      setFormData({ title: '', description: '', price: '', size: '', condition: '', category: '' });
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Seller tools</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">Add product</h1>
          <p className="mt-2 text-sm text-base-content/65 sm:text-base">
            Create a premium listing with clear details and high-quality photos.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-7">
          <h2 className="mb-1 text-xl font-bold tracking-tight text-base-content sm:text-2xl">Listing information</h2>
          <p className="mb-6 text-sm text-base-content/60">Fill out every field to publish your item.</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Vintage denim jacket"
                className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Description</label>
              <textarea
                name="description"
                placeholder="Describe fit, material, and any signs of wear."
                className="textarea textarea-bordered min-h-[120px] w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="65"
                className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Size</label>
              <select
                name="size"
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={formData.size}
                onChange={handleChange}
                required
              >
                <option value="">Select size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Condition</label>
              <select
                name="condition"
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Like New">Like new</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Category</label>
              <select
                name="category"
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Dress">Dress</option>
                <option value="Skirt">Skirt</option>
                <option value="Shirt">Shirt</option>
                <option value="Tshirt">Tshirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Pants">Pants</option>
                <option value="Shorts">Shorts</option>
                <option value="Coat">Coat</option>
                <option value="Sweater">Sweater</option>
                <option value="Blouse">Blouse</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="file-input file-input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm"
              />
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {previews.map((src, index) => (
                  <div key={index} className="overflow-hidden rounded-xl border border-base-300/70 bg-base-100 shadow-sm">
                    <img src={src} alt={`Preview ${index + 1}`} className="h-20 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-6 w-full rounded-xl border-none text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={uploading || submitting}
          >
            {uploading ? 'Uploading images...' : submitting ? 'Publishing...' : 'Add product'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddProduct;

