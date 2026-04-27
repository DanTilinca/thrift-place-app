import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="relative overflow-hidden rounded-3xl border border-base-300/70 bg-base-100 p-7 shadow-sm sm:p-10">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Thrift Place</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
                Buy better pieces.
                <br />
                Sell what you no longer wear.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-base-content/65 sm:text-base">
                A premium marketplace for pre-loved fashion. Discover curated finds, give clothes a second life, and keep style circular.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate('/products')}
                  className="btn btn-primary rounded-xl px-7 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                >
                  Explore marketplace
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-ghost rounded-xl border border-base-300/80 px-7 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-base-200 hover:shadow-md active:scale-95"
                >
                  Start selling
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl bg-base-200/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">Active listings</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">1.2K+</p>
              </div>
              <div className="rounded-2xl bg-base-200/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">Happy members</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">8K+</p>
              </div>
              <div className="rounded-2xl bg-base-200/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">Avg. sell time</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">3 days</p>
              </div>
              <div className="rounded-2xl bg-base-200/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">Secure checkout</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-base-content">100%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl font-bold tracking-tight text-base-content">Curated quality</h2>
            <p className="mt-2 text-sm leading-relaxed text-base-content/65">
              Shop modern essentials, statement pieces, and timeless staples from trusted sellers.
            </p>
          </article>
          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl font-bold tracking-tight text-base-content">Sell in minutes</h2>
            <p className="mt-2 text-sm leading-relaxed text-base-content/65">
              Upload photos, set your price, and publish a premium listing with a smooth workflow.
            </p>
          </article>
          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl font-bold tracking-tight text-base-content">Built on trust</h2>
            <p className="mt-2 text-sm leading-relaxed text-base-content/65">
              Transparent product details and verified user accounts make buying and selling safer.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/50">Community feedback</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">Loved by buyers and sellers</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-base-200/60 p-5">
              <p className="text-sm leading-relaxed text-base-content/70">
                "I finally found pieces that feel unique without paying retail. The quality is consistently better than expected."
              </p>
              <p className="mt-4 text-sm font-semibold text-base-content">Mila R.</p>
            </article>
            <article className="rounded-2xl bg-base-200/60 p-5">
              <p className="text-sm leading-relaxed text-base-content/70">
                "Listing took less than ten minutes. My jacket sold in two days, and the buyer experience was smooth."
              </p>
              <p className="mt-4 text-sm font-semibold text-base-content">Alex T.</p>
            </article>
            <article className="rounded-2xl bg-base-200/60 p-5">
              <p className="text-sm leading-relaxed text-base-content/70">
                "The app feels clean and premium. I use it weekly to refresh my wardrobe sustainably."
              </p>
              <p className="mt-4 text-sm font-semibold text-base-content">Nora V.</p>
            </article>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-primary/20 bg-primary/10 p-7 text-center shadow-sm sm:p-9">
          <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">Ready to find your next favorite fit?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-base-content/70 sm:text-base">
            Explore fresh drops daily and give great clothes a second story.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary mt-6 rounded-xl px-8 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            Shop now
          </button>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;

