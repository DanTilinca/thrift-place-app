import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchSellHistory } from '../services/api';

const SellHistory = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSellHistory = async () => {
      if (user) {
        setIsLoading(true);
        setError('');
        try {
          const response = await fetchSellHistory(user.username);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching sell history:', error);
          setError('Unable to load your sell history right now.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setProducts([]);
        setIsLoading(false);
      }
    };
    getSellHistory();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-base-200/60">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6">
          <div className="rounded-3xl border border-base-300/70 bg-base-100 p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">Sign in to view your sell history</h2>
            <p className="mt-2 text-sm text-base-content/60">Track every sold item and buyer from one place.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Sales</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">Your sell history</h1>
          <p className="mt-2 text-sm text-base-content/65 sm:text-base">Review sold items, buyers, and completed transactions.</p>
        </section>

        {error ? (
          <div className="rounded-3xl border border-error/20 bg-base-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight text-base-content">Could not load sell history</h2>
            <p className="mt-2 text-sm text-base-content/60">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl border border-base-300/70 bg-base-100 p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-24 w-24 rounded-xl" />
                  <div className="flex-1">
                    <div className="skeleton mb-2 h-5 w-1/2" />
                    <div className="skeleton mb-2 h-4 w-1/3" />
                    <div className="skeleton h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-base-300/70 bg-base-100 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">No sales yet</h2>
            <p className="mt-2 text-sm text-base-content/60">Once you sell an item, it will appear here.</p>
          </div>
        ) : (
          <section className="space-y-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="group rounded-2xl border border-base-300/70 bg-base-100 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:w-28"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-base-content sm:text-xl">{product.title}</h3>
                    <p className="mt-1 text-sm text-base-content/65">
                      <span className="font-semibold text-base-content">Buyer:</span> {product.buyer || 'Unknown'}
                    </p>
                    <p className="mt-1 text-lg font-extrabold tracking-tight text-base-content">${product.price}</p>
                  </div>
                  <span className="badge badge-success badge-outline self-start rounded-full border-success/40 px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                    Completed sale
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default SellHistory;

