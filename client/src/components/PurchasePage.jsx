import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { fetchProductById, purchaseProduct } from '../services/api';

const PurchasePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    city: '',
    zip: '',
    phone: '',
    paymentMethod: '',
  });
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
        setError('Unable to load product details for checkout.');
      } finally {
        setIsLoading(false);
      }
    };
    getProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePurchase = async () => {
    const { firstName, lastName, address, country, city, zip, phone, paymentMethod } = formData;

    if (!firstName || !lastName || !address || !country || !city || !zip || !phone || !paymentMethod) {
      alert('Please complete all fields before proceeding.');
      return;
    }

    if (!user) {
      alert('You must be logged in to complete the purchase.');
      return;
    }

    try {
      setIsSubmitting(true);
      await purchaseProduct(id, user.username);
      alert('Purchase completed successfully!');
      navigate('/history/buy');
    } catch (error) {
      console.error('Error completing purchase:', error);
      alert('Failed to complete purchase. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-base-200/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm lg:col-span-1">
              <div className="skeleton mb-4 h-24 w-24 rounded-xl" />
              <div className="skeleton mb-2 h-4 w-2/3" />
              <div className="skeleton h-4 w-1/3" />
            </div>
            <div className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm lg:col-span-2">
              <div className="skeleton mb-3 h-5 w-1/3" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="skeleton h-11 rounded-xl" />
                ))}
              </div>
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
            <h2 className="text-2xl font-bold tracking-tight text-base-content">Checkout unavailable</h2>
            <p className="mt-2 text-sm text-base-content/60">{error || 'Please try again later.'}</p>
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

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Secure checkout</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">Complete your purchase</h1>
          <p className="mt-2 text-sm text-base-content/65 sm:text-base">
            Final step to claim your selected piece. Shipping and payment details are encrypted and secure.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <aside className="rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm lg:sticky lg:top-6 lg:h-fit">
            <h2 className="text-lg font-bold text-base-content">Order summary</h2>
            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-base-200/60 p-3">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="h-24 w-24 rounded-xl object-cover shadow-sm"
              />
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold text-base-content">{product.title}</p>
                <p className="mt-1 text-sm text-base-content/65">
                  {product.condition || 'Pre-loved'} {product.size ? `• Size ${product.size}` : ''}
                </p>
                <p className="mt-2 text-xl font-extrabold tracking-tight text-base-content">${product.price}</p>
              </div>
            </div>
            <button
              className="btn btn-ghost mt-4 w-full rounded-xl border border-base-300/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-base-200 hover:shadow-md active:scale-95"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              Back to product
            </button>
          </aside>

          <section className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-7 lg:col-span-2">
            <h2 className="mb-1 text-xl font-bold tracking-tight text-base-content sm:text-2xl">Shipping details</h2>
            <p className="mb-6 text-sm text-base-content/60">Please fill all fields to place your order.</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered min-h-[100px] w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">ZIP code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Phone number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Payment method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="select select-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="">Select payment method</option>
                <option value="Credit Card">Credit card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank transfer</option>
                <option value="Cash on Delivery">Cash on delivery</option>
              </select>
            </div>

            <button
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="btn btn-primary mt-7 w-full rounded-xl border-none text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Processing...' : 'Complete purchase'}
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PurchasePage;

