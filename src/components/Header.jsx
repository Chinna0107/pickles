import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiUser, FiMenu, FiX, FiPhone, FiShoppingCart, FiTag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpeg';
import { useCart } from '../context/CartContext';
import './Header.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        menuBtnRef.current && !menuBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="promo-banner">
        <div className="promo-scroll">
          <div className="promo-content">
            <FiTag size={14} />
            <span>Use code <strong>GET10</strong> for 10% OFF on all orders!</span>
            <FiTag size={14} />
            <span>Use code <strong>GET10</strong> for 10% OFF on all orders!</span>
            <FiTag size={14} />
            <span>Use code <strong>GET10</strong> for 10% OFF on all orders!</span>
            <FiTag size={14} />
            <span>Use code <strong>GET10</strong> for 10% OFF on all orders!</span>
          </div>
        </div>
      </div>
      <div className="topbar">
        <div className="container topbar-inner">
          <span><FiPhone size={12} /> +91 8142128079</span>
          <span>🌶️ Free delivery on orders above ₹499</span>
          <span>ompicklesandfoodss@gmail.com</span>
        </div>
      </div>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
        <Link to="/" className="logo">
            <div className="logo-icon">
              <img src={logo} alt="OM Pickles Logo" className="logo-img" />
            </div>
            <div className="logo-text">
              <span className="logo-main">OM PICKLES</span>
              <span className="logo-sub">& Foods</span>
            </div>
          </Link>

          <nav className="nav-desktop">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="cart-btn">
              <FiShoppingCart size={18} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            <Link to="/login" className="btn-login">
              <FiUser size={16} />
              <span>Login</span>
            </Link>
            <button ref={menuBtnRef} className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div ref={menuRef} className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/login" className="mobile-link login-mobile">Customer Login</Link>
            <Link to="/admin" className="mobile-link admin-mobile">Admin Login</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
