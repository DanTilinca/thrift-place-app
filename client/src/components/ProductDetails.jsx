import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import AuthContext from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Unable to load this product at the moment.');
      } finally {
        setIsLoading(false);
      }
    };
    getProductDetails();
  }, [id]);

  const imageList = product?.images?.length ? product.images : ['https://placehold.co/800x1000?text=No+Image'];

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              <div className="skeleton mb-3 h-8 w-2/3" />
              <div className="skeleton mb-6 h-8 w-1/4" />
              <div className="skeleton mb-2 h-4 w-full" />
              <div className="skeleton mb-2 h-4 w-5/6" />
              <div className="skeleton h-4 w-4/6" />
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
              onClick={() => navigate('/buy')}
            >
              Back to marketplace
            </button>
          </div>
        </div>
      </main>
    );
  }

  const isOwnProduct = user && user.username === product.seller;

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Product details</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">{product.title}</h1>
          <p className="mt-2 text-sm text-base-content/65 sm:text-base">
            Premium second-hand fashion, inspected and listed with transparent details.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-base-300/70 bg-base-100 p-4 shadow-sm sm:p-5">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={imageList[selectedImageIndex]}
                alt={product.title}
                className="h-[26rem] w-full cursor-zoom-in object-cover transition-transform duration-500 hover:scale-[1.02]"
                onClick={openModal}
              />
              {imageList.length > 1 ? (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="btn btn-circle btn-sm absolute left-3 top-1/2 -translate-y-1/2 border-none bg-base-100/90 text-base-content shadow-sm transition-all duration-300 hover:-translate-y-[52%] hover:bg-base-100 hover:shadow-md active:scale-95"
                  >
                    ❮
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="btn btn-circle btn-sm absolute right-3 top-1/2 -translate-y-1/2 border-none bg-base-100/90 text-base-content shadow-sm transition-all duration-300 hover:-translate-y-[52%] hover:bg-base-100 hover:shadow-md active:scale-95"
                  >
                    ❯
                  </button>
                </>
              ) : null}
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {imageList.map((image, index) => (
                <button
                  key={index}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
                    selectedImageIndex === index
                      ? 'border-primary shadow-sm'
                      : 'border-base-300/80 hover:-translate-y-0.5 hover:border-primary/40'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-7">
            <p className="text-3xl font-extrabold tracking-tight text-base-content">${product.price}</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-base-content/50">Listed on</p>
                <p className="mt-1 text-sm font-semibold text-base-content">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-ghost rounded-xl border border-base-300/80 px-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-base-200 hover:shadow-md active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                Wishlist
              </button>
              <button
                className={`btn rounded-xl px-6 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 ${
                  isOwnProduct ? 'btn-disabled' : 'btn-primary'
                }`}
                onClick={() => !isOwnProduct && navigate(`/purchase/${product._id}`)}
                disabled={isOwnProduct}
              >
                {isOwnProduct ? 'You own this product' : 'Buy now'}
              </button>
            </div>
          </article>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold tracking-tight text-base-content sm:text-2xl">Product description</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-base-content/70 sm:text-base">
              {product.description || 'No additional description provided.'}
            </p>
          </article>

          <article className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight text-base-content">Seller information</h2>
            <div className="mt-4 space-y-2 text-sm text-base-content/70">
              <p>
                <span className="font-semibold text-base-content">Seller:</span> {product.seller || 'Unknown'}
              </p>
              <p>
                <span className="font-semibold text-base-content">Support:</span> Use chat to ask about sizing, fit, and condition.
              </p>
            </div>
          </article>
        </section>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <img
            src={imageList[selectedImageIndex]}
            alt={`Full view of ${product.title}`}
            className="max-h-[90vh] w-full max-w-5xl rounded-2xl object-contain"
          />
        </div>
      )}
    </main>
  );
};

export default ProductDetails;

