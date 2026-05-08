import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';
import logo from '../assets/logo.jpeg';
import './Login.css';

import API from '../config';

export default function CustomerLogin() {
  const [form, setForm] = useState({ email: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/customer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, mobile: form.mobile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('customerToken', data.token);
      localStorage.setItem('customerData', JSON.stringify({ email: data.email, mobile: data.mobile }));
      // Refresh the page after successful login
      window.location.href = '/customer/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg-gradient" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="login-particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="login-container">
        <motion.div className="login-card"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}>

          <div className="login-brand">
            <div className="login-logo">
              <img src={logo} alt="OM Pickles" className="login-logo-img" />
            </div>
            <div className="login-brand-name">OM PICKLES</div>
            <div className="login-brand-sub">& Foods</div>
          </div>

          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Enter your email & mobile to continue</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <FiMail className="input-icon" />
              <input type="email" placeholder="Email Address" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="input-group">
              <FiPhone className="input-icon" />
              <input type="tel" placeholder="Mobile Number" required
                value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              <span>{loading ? 'Please wait...' : 'Sign In'}</span>
              <FiArrowRight />
            </button>
          </form>

          <div className="login-footer-links">
            <Link to="/">← Back to Home</Link>
            <Link to="/admin">Admin Login</Link>
          </div>
        </motion.div>

        <motion.div className="login-side"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="login-side-content">
            <div className="side-emoji">🫙</div>
            <h3>Authentic Andhra Pickles</h3>
            <p>Sign in to track your orders, save favorites, and enjoy exclusive member discounts!</p>
            <div className="side-benefits">
              <div className="benefit">✅ Track your orders in real-time</div>
              <div className="benefit">✅ Exclusive member discounts</div>
              <div className="benefit">✅ Save your favorite products</div>
              <div className="benefit">✅ Easy reorder with one click</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
