import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';

const BuyPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const params = { search, minPrice, maxPrice, size, condition, sort, category, page, limit };
      const response = await fetchProducts(params);
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (err) {
      setError('Something went wrong while loading products. Please try again.');
      setProducts([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [search, minPrice, maxPrice, size, condition, sort, category, page, limit]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Marketplace</p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
                Discover your next favorite outfit
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-base-content/65 sm:text-base">
                Curated pre-loved fashion with modern styles, fair prices, and pieces that deserve a second life.
              </p>
            </div>
            <div className="w-full max-w-md">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-base-content/55">
                Search
              </label>
              <input
                type="text"
                placeholder="Try jacket, dress, or cotton shirt..."
                className="input input-bordered w-full rounded-2xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-base-content sm:text-xl">Filters & sort</h2>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-base-content/50">
              {total} item{total === 1 ? '' : 's'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Min price</label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Max price</label>
              <input
                type="number"
                placeholder="500"
                className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Size</label>
              <select
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All sizes</option>
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
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All conditions</option>
                <option value="New">New</option>
                <option value="Like New">Like new</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Category</label>
              <select
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All categories</option>
                <option value="Dress">Dress</option>
                <option value="Skirt">Skirt</option>
                <option value="Shirt">Shirt</option>
                <option value="Tshirt">T-shirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Pants">Pants</option>
                <option value="Shorts">Shorts</option>
                <option value="Coat">Coat</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Sort by</label>
              <select
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Default</option>
                <option value="price_asc">Price: Low to high</option>
                <option value="price_desc">Price: High to low</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">
                Products per page
              </label>
              <select
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value="9">9</option>
                <option value="18">18</option>
                <option value="27">27</option>
              </select>
            </div>
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-base-content/65">
            <span className="font-semibold text-base-content">Page {page}</span> of {totalPages}
          </p>
          <div className="join items-center">
            <button
              className="join-item btn h-10 min-h-10 w-28 rounded-xl border border-base-300/80 bg-base-100 px-4 text-xs font-semibold uppercase tracking-wide text-base-content shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-base-400 hover:bg-base-200 hover:shadow-md active:scale-95 disabled:border-base-300/60 disabled:bg-base-100 disabled:text-base-content/40 disabled:shadow-none"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isLoading}
            >
              Previous
            </button>
            <span className="join-item inline-flex h-9 min-w-12 items-center justify-center rounded-xl border border-base-300/80 bg-base-200/60 px-3 text-sm font-semibold tabular-nums text-base-content shadow-sm">
              {page}
            </span>
            <button
              className="join-item btn btn-primary h-10 min-h-10 w-28 rounded-xl px-4 text-xs font-semibold uppercase tracking-wide text-primary-content transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages || isLoading}
            >
              Next
            </button>
          </div>
        </section>

        {error ? (
          <div className="mb-6 rounded-2xl border border-error/20 bg-error/5 px-4 py-3 text-sm font-medium text-error">{error}</div>
        ) : null}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: limit }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="rounded-2xl border border-base-300/70 bg-base-100 p-4 shadow-sm">
                <div className="skeleton mb-4 h-52 w-full rounded-xl" />
                <div className="skeleton mb-2 h-4 w-3/4" />
                <div className="skeleton h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : hasProducts ? (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product._id}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-base-100/90 px-3 py-1 text-xs font-semibold tracking-wide text-base-content shadow-sm">
                    {product.condition || 'Pre-loved'}
                  </div>
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-base-content">{product.title}</h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-base-content/60">
                    {product.category || 'Fashion item'} {product.size ? `• Size ${product.size}` : ''}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xl font-extrabold tracking-tight text-base-content">${product.price}</p>
                    <button
                      className="btn btn-primary btn-sm rounded-xl border-none px-4 text-xs font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${product._id}`);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="rounded-2xl border border-base-300/70 bg-base-100 p-10 text-center shadow-sm">
            <h3 className="text-xl font-bold tracking-tight text-base-content">No products found</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-base-content/60">
              Try adjusting your filters or search terms to explore more items.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BuyPage;

