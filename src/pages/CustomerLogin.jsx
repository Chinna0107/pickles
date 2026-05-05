import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUser } from 'react-icons/fi';
import logo from '../assets/logo.jpeg';
import './Login.css';

export default function CustomerLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isRegister ? 'Account created successfully!' : 'Login successful!');
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

          {/* BRAND */}
          <div className="login-brand">
            <div className="login-logo">
              <img src={logo} alt="OM Pickles" className="login-logo-img" />
            </div>
            <div className="login-brand-name">OM PICKLES</div>
            <div className="login-brand-sub">& Foods</div>
          </div>

          {/* TABS */}
          <div className="login-tabs">
            <button className={`login-tab ${!isRegister ? 'active' : ''}`} onClick={() => setIsRegister(false)}>
              Sign In
            </button>
            <button className={`login-tab ${isRegister ? 'active' : ''}`} onClick={() => setIsRegister(true)}>
              Register
            </button>
            <div className="tab-slider" style={{ transform: `translateX(${isRegister ? '100%' : '0'})` }} />
          </div>

          <motion.div key={isRegister ? 'register' : 'login'}
            initial={{ opacity: 0, x: isRegister ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}>

            <h2 className="login-title">
              {isRegister ? 'Create Account' : 'Welcome Back!'}
            </h2>
            <p className="login-subtitle">
              {isRegister ? 'Join OM Pickles family today' : 'Sign in to your account'}
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              {isRegister && (
                <div className="input-group">
                  <FiUser className="input-icon" />
                  <input type="text" placeholder="Full Name" required />
                </div>
              )}
              <div className="input-group">
                <FiMail className="input-icon" />
                <input type="email" placeholder="Email Address" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="input-group has-toggle">
                <FiLock className="input-icon" />
                <input type={showPass ? 'text' : 'password'} placeholder="Password" required
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {isRegister && (
                <div className="input-group has-toggle">
                  <FiLock className="input-icon" />
                  <input type={showPass ? 'text' : 'password'} placeholder="Confirm Password" required />
                </div>
              )}
              {!isRegister && (
                <div className="forgot-link">
                  <a href="#">Forgot Password?</a>
                </div>
              )}
              <button type="submit" className="login-btn">
                <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                <FiArrowRight />
              </button>
            </form>
          </motion.div>

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
