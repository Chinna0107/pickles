import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiTag, FiTruck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const getPrice = (item) =>
    item.prices?.find(p => p.weight === item.selectedWeight)?.price || item.prices?.[0]?.price || 0;

  const subtotal = items.reduce((sum, i) => sum + getPrice(i) * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 499 ? 0 : 60;
  const total = subtotal - discount + delivery;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'OM10') setCouponApplied(true);
  };

  return (
    <div className="cart-page page-enter">
      {/* PAGE HERO */}
      <section className="cart-hero">
        <div className="cart-hero-bg" />
        <div className="container cart-hero-content">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="cart-hero-tag">🛒 Your Cart</span>
            <h1>Shopping Cart</h1>
            <p>{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
          </motion.div>
        </div>
        <div className="cart-hero-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      <div className="container cart-layout">
        {items.length === 0 ? (
          <motion.div className="cart-empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}>
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any pickles yet!</p>
            <Link to="/products" className="btn-primary">
              <span>Browse Products</span>
              <FiArrowRight />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="cart-items-col">
              <div className="cart-items-header">
                <h2>Order Items</h2>
                <button className="clear-btn" onClick={() => clearCart()}>Clear All</button>
              </div>

              <AnimatePresence>
                {items.map((item) => {
                  const price = getPrice(item);
                  const origPrice = item.prices?.find(p => p.weight === item.selectedWeight)?.originalPrice || price;
                  return (
                    <motion.div key={`${item.id}-${item.selectedWeight}`} className="cart-item"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}>
                      <Link to={`/products/${item.slug}`} className="cart-item-img">
                        <img src={item.images?.[0]} alt={item.name} />
                      </Link>
                      <div className="cart-item-info">
                        <div className="cart-item-top">
                          <div>
                            <span className="cart-item-tag">{item.tag}</span>
                            <Link to={`/products/${item.slug}`}><h3>{item.name}</h3></Link>
                            <p className="cart-item-weight">{item.selectedWeight} · {'🌶️'.repeat(item.spice)}</p>
                          </div>
                          <button className="remove-btn" onClick={() => removeItem(item.id, item.selectedWeight)}>
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                        <div className="cart-item-bottom">
                          <div className="cart-price-group">
                            <span className="cart-price">₹{price * item.qty}</span>
                            <span className="cart-unit">₹{price} each</span>
                            {origPrice > price && (
                              <span className="cart-orig">₹{origPrice}</span>
                            )}
                          </div>
                          <div className="qty-control">
                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQty(item.id, item.selectedWeight, -1)}>
                              <FiMinus size={14} />
                            </motion.button>
                            <span>{item.qty}</span>
                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQty(item.id, item.selectedWeight, 1)}>
                              <FiPlus size={14} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* DELIVERY BANNER */}
              <div className="delivery-banner">
                <FiTruck size={18} />
                {delivery === 0
                  ? <span>🎉 You've unlocked <strong>FREE delivery!</strong></span>
                  : <span>Add <strong>₹{499 - subtotal}</strong> more for free delivery</span>}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <motion.div className="cart-summary"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}>
              <h2>Order Summary</h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                {couponApplied && (
                  <div className="summary-row discount">
                    <span>Coupon (OM10)</span>
                    <span>−₹{discount}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'free' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* COUPON */}
              <div className="coupon-box">
                <FiTag size={16} />
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  disabled={couponApplied}
                />
                <button
                  className={`coupon-apply ${couponApplied ? 'applied' : ''}`}
                  onClick={applyCoupon}
                  disabled={couponApplied}>
                  {couponApplied ? '✓' : 'Apply'}
                </button>
              </div>
              {couponApplied && <p className="coupon-success">10% discount applied!</p>}
              {coupon && !couponApplied && coupon.toUpperCase() !== 'OM10' && (
                <p className="coupon-hint">Try code: <strong>OM10</strong></p>
              )}

              <motion.button className="checkout-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/checkout')}>
                <FiShoppingBag size={18} />
                <span>Proceed to Checkout</span>
                <FiArrowRight size={16} />
              </motion.button>

              <Link to="/products" className="continue-shopping">
                ← Continue Shopping
              </Link>

              {/* TRUST BADGES */}
              <div className="trust-badges">
                <div className="trust-badge"><span>🔒</span><p>Secure Payment</p></div>
                <div className="trust-badge"><span>🚚</span><p>Fast Delivery</p></div>
                <div className="trust-badge"><span>↩️</span><p>Easy Returns</p></div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
