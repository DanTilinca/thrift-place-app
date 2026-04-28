import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_BASE_URL}/users/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      login(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-base-300/70 bg-base-100 p-8 shadow-sm sm:p-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">Join the community</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">Create your account</h1>
            <p className="mt-3 text-sm leading-relaxed text-base-content/65 sm:text-base">
              Start buying and selling pre-loved fashion with a clean, trusted marketplace experience.
            </p>
            <div className="mt-6 rounded-2xl bg-base-200/60 p-4">
              <p className="text-sm text-base-content/70">List items quickly, chat with buyers, and track your activity from one dashboard.</p>
            </div>
          </section>

          <section className="rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">Register</h2>
            <p className="mt-1 text-sm text-base-content/60">Create an account in under a minute.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error ? (
                <div className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm font-medium text-error">{error}</div>
              ) : null}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="yourusername"
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a secure password"
                  className="input input-bordered w-full rounded-xl border-base-300/80 bg-base-100 text-sm shadow-sm transition-all duration-300 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary mt-2 w-full rounded-xl border-none text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Creating account...' : 'Register'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-base-content/70">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary transition-colors duration-200 hover:text-primary/80">
                Log in
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Register;

