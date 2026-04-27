import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct, deleteProduct } from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '' });
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
        });
        if (response.data.images.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Unable to load product details.');
      } finally {
        setIsLoading(false);
      }
    };
    getProductDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateProduct(id, formData);
      alert('Product updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setIsDeleting(true);
        await deleteProduct(id);
        alert('Product deleted successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-base-200/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-base-300/70 bg-base-100 p-4 shadow-sm">
              <div className="skeleton h-[26rem] w-full rounded-2xl" />
              <div className="mt-4 flex gap-3">
                <div className="skeleton h-20 w-20 rounded-xl" />
                <div className="skeleton h-20 w-20 rounded-xl" />
                <div className="skeleton h-20 w-20 rounded-xl" />
              </div>
            </div>
            <div className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm">
              <div className="skeleton mb-3 h-5 w-1/2" />
              <div className="skeleton mb-3 h-11 w-full rounded-xl" />
              <div className="skeleton mb-3 h-28 w-full rounded-xl" />
              <div className="skeleton h-11 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-base-200/60">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
          <div className="rounded-3xl border border-error/20 bg-base-100 p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">Could not load product</h2>
            <p className="mt-2 text-sm text-base-content/60">{error || 'Please try again in a moment.'}</p>
            <button
              className="btn btn-primary mt-6 rounded-xl px-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
              onClick={() => navigate('/dashboard')}
            >
              Back to dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  const imageList = product.images?.length ? product.images : ['https://placehold.co/800x1000?text=No+Image'];

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Seller tools</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">Edit product</h1>
          <p className="mt-2 text-sm text-base-content/65 sm:text-base">
            Keep your listing fresh with cleaner details, better copy, and accurate pricing.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-base-300/70 bg-base-100 p-4 shadow-sm sm:p-5">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={selectedImage || imageList[0]}
                alt={product.title}
                className="h-[26rem] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {imageList.map((image, index) => (
                <button
                  key={index}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
                    selectedImage === image
                      ? 'border-primary shadow-sm'
                      : 'border-base-300/80 hover:-translate-y-0.5 hover:border-primary/40'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-7">
            <h2 className="text-xl font-bold tracking-tight text-base-content sm:text-2xl">Listing overview</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-base-200/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-base-content/50">Size</p>
                <p className="mt-1 text-sm font-semibold text-base-content">{product.size || 'Not specified'}</p>
              </div>
              <div className="rounded-xl bg-base-200/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-base-content/50">Condition</p>
                <p className="mt-1 text-sm font-semibold text-base-content">{product.condition || 'Not specified'}</p>
              </div>
              <div className="rounded-xl bg-base-200/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-base-content/50">Category</p>
                <p className="mt-1 text-sm font-semibold text-base-content">{product.category || 'Fashion'}</p>
              </div>
              <div className="rounded-xl bg-base-200/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-base-content/50">Created at</p>
                <p className="mt-1 text-sm font-semibold text-base-content">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-base-content/60">
              Editing supports title, description, and price. Size/condition/category remain unchanged in this form.
            </p>
          </article>
        </section>

        <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-7">
          <h2 className="mb-1 text-xl font-bold tracking-tight text-base-content sm:text-2xl">Edit listing information</h2>
          <p className="mb-6 text-sm text-base-content/60">Refine your content to attract more buyers.</p>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered min-h-[120px] w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting || isDeleting}
              className="btn btn-primary rounded-xl px-6 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Updating...' : 'Update product'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isSubmitting}
              className="btn btn-error rounded-xl px-6 text-sm font-semibold uppercase tracking-[0.08em] text-error-content transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? 'Deleting...' : 'Delete product'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProduct;

