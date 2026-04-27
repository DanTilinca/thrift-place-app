import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { fetchProductsBySeller } from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProducts = async () => {
      if (user) {
        setIsLoading(true);
        setError('');
        try {
          const response = await fetchProductsBySeller(user.username);
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching user products:', error);
          setError('Unable to load your listings right now.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setProducts([]);
        setIsLoading(false);
      }
    };
    getUserProducts();
  }, [user]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const soldCount = products.filter((product) => product.buyer).length;
  const liveCount = products.length - soldCount;

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Seller hub</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">Your dashboard</h1>
              <p className="mt-2 text-sm text-base-content/65 sm:text-base">
                Manage your listings, track sold pieces, and keep your shop fresh.
              </p>
            </div>
            <button
              onClick={handleAddProduct}
              className="btn btn-primary rounded-xl px-6 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
            >
              Add new product
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Total listings</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-base-content">{products.length}</p>
            </div>
            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Active</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-base-content">{liveCount}</p>
            </div>
            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Sold</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-base-content">{soldCount}</p>
            </div>
          </div>
        </section>

        {!user ? (
          <div className="rounded-3xl border border-base-300/70 bg-base-100 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">Sign in to access your dashboard</h2>
            <p className="mt-2 text-sm text-base-content/60">Once logged in, your listings and sales stats will appear here.</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-error/20 bg-base-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight text-base-content">Could not load listings</h2>
            <p className="mt-2 text-sm text-base-content/60">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl border border-base-300/70 bg-base-100 p-4 shadow-sm">
                <div className="skeleton mb-4 h-52 w-full rounded-xl" />
                <div className="skeleton mb-2 h-5 w-2/3" />
                <div className="skeleton mb-3 h-4 w-full" />
                <div className="skeleton h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-base-300/70 bg-base-100 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">No listings yet</h2>
            <p className="mt-2 text-sm text-base-content/60">Start selling by creating your first product listing.</p>
            <button
              onClick={handleAddProduct}
              className="btn btn-primary mt-6 rounded-xl px-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
            >
              Create first listing
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product._id}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  product.buyer ? 'opacity-90' : ''
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.buyer ? (
                    <span className="absolute left-3 top-3 rounded-full bg-error px-3 py-1 text-xs font-bold uppercase tracking-wide text-error-content shadow-sm">
                      Sold
                    </span>
                  ) : (
                    <span className="absolute left-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-bold uppercase tracking-wide text-success-content shadow-sm">
                      Live
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-base-content">{product.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-base-content/60">{product.description}</p>
                  <div className="mt-auto pt-4">
                    <p className="text-xl font-extrabold tracking-tight text-base-content">${product.price}</p>
                    <button
                      onClick={() => handleEditProduct(product._id)}
                      className="btn btn-ghost mt-4 w-full rounded-xl border border-base-300/80 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-base-200 hover:shadow-md active:scale-95"
                    >
                      Edit listing
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Dashboard;

