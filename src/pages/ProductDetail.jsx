import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiStar, FiZoomIn, FiX, FiChevronLeft, FiChevronRight,
  FiShoppingBag, FiCheck, FiHeart, FiTruck, FiShield,
  FiAward, FiPackage, FiMinus, FiPlus, FiShare2, FiMapPin,
  FiThumbsUp, FiMessageCircle, FiInfo, FiPhone, FiMail, FiPercent, FiArrowLeft
} from 'react-icons/fi';
import { testimonials } from '../data/products';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const TRUST_BADGES = [
  { icon: <FiTruck />, label: 'Free Delivery', sub: 'For a limited period!' },
  { icon: <FiShield />, label: '100% Natural', sub: 'No preservatives' },
  { icon: <FiAward />, label: 'Authentic Recipe', sub: 'Generations old' },
  { icon: <FiPackage />, label: 'Safe Packaging', sub: 'Leak-proof jars' },
];

const TABS = ['Description', 'Ingredients', 'Storage', 'Reviews', 'Nutrition'];
const TABS_KARAM = ['Description', 'Ingredients', 'Reviews', 'Nutrition'];

const NUTRITION = {
  veg:    { calories: '45 kcal', protein: '2.1g', carbs: '8.5g', fat: '1.2g', fiber: '3.2g', sodium: '890mg' },
  nonveg: { calories: '185 kcal', protein: '22.5g', carbs: '3.2g', fat: '8.5g', fiber: '1.1g', sodium: '1120mg' },
  karam:  { calories: '320 kcal', protein: '12.8g', carbs: '28.5g', fat: '18.2g', fiber: '8.5g', sodium: '650mg' },
};

const SPICE_LABELS = ['', 'Mild', 'Mild-Medium', 'Medium', 'Hot', 'Extra Hot'];

import API from '../config';
import useSEO from '../hooks/useSEO';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useProduct(slug);
  const { addToCart } = useCart();

  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useSEO({
    title: product ? `${product.name} — Buy Authentic Andhra Pickle Online` : 'Product',
    description: product
      ? `Buy ${product.name} online — ${product.short_desc}. Handcrafted authentic Andhra pickle by OM Pickles & Foods. No preservatives, delivered across India.`
      : '',
    canonical: `/products/${slug}`,
    image: product?.images?.[0],
    type: 'product',
  });

  useEffect(() => {
    if (!product) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'product-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.full_desc || product.short_desc,
      image: product.images,
      brand: { '@type': 'Brand', name: 'OM Pickles & Foods' },
      offers: product.prices?.map(p => ({
        '@type': 'Offer',
        price: p.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `https://ompicklesandfoods.in/products/${slug}`,
        name: p.weight,
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews,
        bestRating: 5,
        worstRating: 1,
      },
    });
    document.getElementById('product-jsonld')?.remove();
    document.head.appendChild(script);
    return () => document.getElementById('product-jsonld')?.remove();
  }, [product, slug]);

  useEffect(() => { window.scrollTo(0, 0); setActiveTab(0); }, [slug]);

  useEffect(() => {
    if (product?.prices?.[0]?.weight) setSelectedWeight(product.prices[0].weight);
  }, [product]);

  if (loading || !product) return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="dash-spinner" /></div>;

  const images = product.images?.length ? product.images : ['https://placehold.co/600x600?text=No+Image'];
  const prices = product.prices?.length ? product.prices : [{ weight: '', price: 0, originalPrice: 0 }];
  const benefits = product.benefits?.length ? product.benefits : [];
  const ingredients = product.ingredients?.length ? product.ingredients : [];
  const tabs = product.category === 'karam' ? TABS_KARAM : TABS;

  const currentPrice = prices.find(p => p.weight === selectedWeight) || prices[0];
  const discount = currentPrice.originalPrice ? Math.round(((currentPrice.originalPrice - currentPrice.price) / currentPrice.originalPrice) * 100) : 0;
  const relatedProducts = [];
  const nutrition = NUTRITION[product.category] || NUTRITION.veg;
  const reviews = testimonials.slice(0, 3);
  const activeTabLabel = tabs[activeTab];

  const nextImage = () => setSelectedImage(p => (p + 1) % images.length);
  const prevImage = () => setSelectedImage(p => (p - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="pd-page">

      {/* TOP BAR */}
      <div className="pd-topbar">
        <div className="container">
          <motion.button className="pd-back-btn" onClick={() => navigate('/products')}
            whileHover={{ x: -3 }} whileTap={{ scale: 0.96 }}>
            <FiArrowLeft size={16} /> Back to Products
          </motion.button>
          <nav className="pd-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/products">Products</Link>
            <span>/</span>
            <span className="active">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="container pd-main">

        {/* IMAGE GALLERY */}
        <motion.div className="pd-gallery"
          initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>

          <div className="pd-main-img-wrap">
            <AnimatePresence mode="wait">
              <motion.img key={selectedImage} src={images[selectedImage]} alt={product.name}
                className="pd-main-img"
                initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            </AnimatePresence>

            <div className="pd-img-badges">
              <span className="pd-badge discount">{discount}% OFF</span>
              <span className="pd-badge tag">{product.tag}</span>
            </div>

            <button className="pd-zoom-btn" onClick={() => setIsFullscreen(true)}>
              <FiZoomIn /> Zoom
            </button>

            <div className="pd-dots">
              {images.map((_, i) => (
                <button key={i} className={`pd-dot ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)} />
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <div className="pd-nav-row">
              <button className="pd-nav prev" onClick={prevImage}><FiChevronLeft /></button>
              <button className="pd-nav next" onClick={nextImage}><FiChevronRight /></button>
            </div>
          )}

          <div className="pd-thumbs">
            {images.map((img, idx) => (
              <motion.button key={idx} className={`pd-thumb ${idx === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <img src={img} alt={`${product.name} ${idx + 1}`} />
              </motion.button>
            ))}
          </div>

          <div className="pd-img-actions">
            <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}>
              <FiShare2 /> Share
            </button>
          </div>
        </motion.div>

        {/* INFO */}
        <motion.div className="pd-info"
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>

          {/* Header */}
          <div className="pd-overview">
            <div className="pd-pills">
              <span className="pill cat">{product.emoji} {product.category.toUpperCase()}</span>
              <span className="pill tag">{product.tag}</span>
            </div>
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-subtitle">{product.short_desc}</p>

            <div className="pd-rating-row">
              <div className="pd-stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < Math.round(product.rating) ? 'filled' : ''} />
                ))}
              </div>
              <span className="pd-rating-val">{product.rating}</span>
              <span className="pd-reviews">({product.reviews} reviews)</span>
            </div>

            <div className="pd-price-block">
              <span className="pd-price">₹{currentPrice.price}</span>
              <span className="pd-orig">₹{currentPrice.originalPrice}</span>
              <span className="pd-discount-pill">{discount}% OFF</span>
              <span className="pd-savings">Save ₹{currentPrice.originalPrice - currentPrice.price}</span>
            </div>
          </div>

          {/* Weight */}
          <div className="pd-weight-section">
            <label>Select Weight</label>
            <div className="pd-weight-options">
              {prices.map(p => (
                <motion.button key={p.weight}
                  className={`pd-weight-btn ${selectedWeight === p.weight ? 'selected' : ''}`}
                  onClick={() => setSelectedWeight(p.weight)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <span>{p.weight}</span>
                  <span className="w-price">₹{p.price}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="pd-qty-section">
            <label>Quantity</label>
            <div className="pd-qty-control">
              <motion.button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                whileTap={{ scale: 0.9 }} disabled={quantity === 1}><FiMinus /></motion.button>
              <span>{quantity}</span>
              <motion.button onClick={() => setQuantity(q => q + 1)} whileTap={{ scale: 0.9 }}><FiPlus /></motion.button>
              <span className="qty-total">= ₹{currentPrice.price * quantity}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pd-actions">
            <motion.button className={`pd-cart-btn ${addedToCart ? 'success' : ''}`}
              onClick={handleAddToCart} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              {addedToCart ? <FiCheck /> : <FiShoppingBag />}
              {addedToCart ? `Added ${quantity} to Cart!` : 'Add to Cart'}
            </motion.button>
            <motion.button className={`pd-fav-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiHeart />
            </motion.button>
          </div>

          {/* Spice Level */}
          <div className="pd-spice">
            <label>Spice Level</label>
            <div className="pd-spice-track">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`spice-pip ${i < product.spice ? 'active' : ''}`}>
                  {i < product.spice ? '🌶️' : '○'}
                </span>
              ))}
              <span className="spice-label">{SPICE_LABELS[product.spice]}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BENEFITS + TRUST + OFFERS */}
      <div className="container pd-extra">
        <div className="pd-benefits">
          <h3>Key Benefits</h3>
          <div className="pd-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="pd-benefit-item">
                <span className="benefit-check">✓</span> {b}
              </div>
            ))}
          </div>
        </div>

        <div className="pd-trust-badges">
          {TRUST_BADGES.map((b, i) => (
            <motion.div key={i} className="pd-trust-badge" whileHover={{ y: -3 }}>
              <span className="trust-icon">{b.icon}</span>
              <div>
                <div className="trust-label">{b.label}</div>
                <div className="trust-sub">{b.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pd-offers">
          <div className="pd-offer-card">
            <FiPercent className="offer-icon" />
            <div>
              <div className="offer-title">Bulk Discount</div>
              <div className="offer-desc">Save more on larger quantities</div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <section className="pd-tabs-section">
        <div className="container">
          <div className="pd-tabs-header">
            {tabs.map((tab, i) => (
              <button key={i} className={`pd-tab-btn ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}>
                {tab}
                {activeTab === i && <motion.div className="pd-tab-underline" layoutId="tab-line" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="pd-tab-content"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

              {activeTabLabel === 'Description' && <p className="pd-desc-text">{product.fullDesc}</p>}

              {activeTabLabel === 'Ingredients' && (
                <ul className="pd-ingredients">
                  {ingredients.map((ing, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}>
                      <span className="ing-dot">●</span> {ing}
                    </motion.li>
                  ))}
                </ul>
              )}

              {activeTabLabel === 'Storage' && (
                <div className="pd-storage-grid">
                  {[
                    { icon: '🌡️', title: 'Temperature', desc: 'Store below 25°C' },
                    { icon: '📅', title: 'Shelf Life', desc: '12 months unopened' },
                    { icon: '🧊', title: 'After Opening', desc: 'Refrigerate, use within 3 months' },
                    { icon: '🥄', title: 'Usage Tip', desc: 'Always use a dry spoon' },
                  ].map((s, i) => (
                    <div key={i} className="pd-storage-card">
                      <span className="storage-icon">{s.icon}</span>
                      <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                    </div>
                  ))}
                </div>
              )}

              {activeTabLabel === 'Reviews' && (
                <div className="pd-reviews">
                  <div className="pd-reviews-summary">
                    <div className="avg-rating-block">
                      <span className="avg-num">{product.rating}</span>
                      <div className="avg-stars">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={i < Math.round(product.rating) ? 'filled' : ''} />
                        ))}
                      </div>
                      <span className="avg-count">{product.reviews} reviews</span>
                    </div>
                    <div className="rating-bars">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="rating-bar-row">
                          <span>{star}★</span>
                          <div className="bar-track">
                            <div className="bar-fill" style={{ width: `${star === 5 ? 85 : star === 4 ? 12 : 3}%` }} />
                          </div>
                          <span>{star === 5 ? 85 : star === 4 ? 12 : 3}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pd-reviews-list">
                    {reviews.slice(0, showAllReviews ? reviews.length : 2).map((r, i) => (
                      <motion.div key={r.id} className="pd-review-card"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}>
                        <div className="review-top">
                          <div className="reviewer">
                            <div className="reviewer-avatar">{r.avatar}</div>
                            <div>
                              <div className="reviewer-name">{r.name}</div>
                              <div className="reviewer-city"><FiMapPin size={11} /> {r.city}</div>
                            </div>
                          </div>
                          <div className="review-stars">
                            {[...Array(5)].map((_, si) => (
                              <FiStar key={si} className={si < r.rating ? 'filled' : ''} />
                            ))}
                          </div>
                        </div>
                        <p className="review-text">{r.text}</p>
                        <div className="review-actions">
                          <button><FiThumbsUp size={13} /> Helpful</button>
                          <button><FiMessageCircle size={13} /> Reply</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {reviews.length > 2 && (
                    <button className="pd-show-more" onClick={() => setShowAllReviews(!showAllReviews)}>
                      {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
                    </button>
                  )}
                </div>
              )}

              {activeTabLabel === 'Nutrition' && (
                <div className="pd-nutrition">
                  <div className="pd-nutrition-header">
                    <h3>Nutritional Information</h3>
                    <span>Per 100g serving</span>
                  </div>
                  <div className="pd-nutrition-grid">
                    {Object.entries({ Calories: nutrition.calories, Protein: nutrition.protein, Carbohydrates: nutrition.carbs, Fat: nutrition.fat, Fiber: nutrition.fiber, Sodium: nutrition.sodium }).map(([k, v]) => (
                      <div key={k} className="pd-nutrition-item">
                        <span className="n-label">{k}</span>
                        <span className="n-value">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pd-nutrition-note">
                    <FiInfo /> Values are approximate and may vary based on preparation method.
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <div className="pd-related-header">
              <div>
                <h2>You May Also Like</h2>
                <p>Handpicked recommendations based on your taste</p>
              </div>
              <Link to="/products" className="pd-view-all">View All <FiArrowLeft style={{ transform: 'rotate(180deg)' }} /></Link>
            </div>
            <div className="pd-related-grid">
              {relatedProducts.map((rp, i) => (
                <motion.div key={rp.id} className="pd-related-card"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }}
                  onClick={() => navigate(`/products/${rp.slug}`)}>
                  <div className="related-img-wrap">
                    <img src={rp.images[0]} alt={rp.name} />
                    <span className="related-tag-badge">{rp.tag}</span>
                  </div>
                  <div className="related-info">
                    <div className="related-top-row">
                      <span>{rp.emoji}</span>
                      <div className="related-stars">
                        {[...Array(5)].map((_, si) => (
                          <FiStar key={si} className={si < Math.round(rp.rating) ? 'filled' : ''} />
                        ))}
                        <span>({rp.rating})</span>
                      </div>
                    </div>
                    <h4>{rp.name}</h4>
                    <p>{rp.shortDesc}</p>
                    <div className="related-price-row">
                      <span className="r-price">₹{rp.prices[0].price}</span>
                      <span className="r-orig">₹{rp.prices[0].originalPrice}</span>
                      <motion.button className="r-add-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                        onClick={e => e.stopPropagation()}>
                        <FiPlus />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="pd-contact">
        <div className="container">
          <div className="pd-contact-card">
            <div className="pd-contact-content">
              <h3>Have Questions About This Product?</h3>
              <p>Our pickle experts are here to help you choose the perfect flavor.</p>
              <div className="pd-contact-methods">
                <a href="tel:+918142128079" className="pd-contact-method">
                  <FiPhone />
                  <div>
                    <div className="c-label">Call Us</div>
                    <div className="c-value">+91 8142128079</div>
                  </div>
                </a>
                <a href="mailto:ompicklesandfoodss@gmail.com" className="pd-contact-method">
                  <FiMail />
                  <div>
                    <div className="c-label">Email Us</div>
                    <div className="c-value">ompicklesandfoodss@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
            <img src="https://res.cloudinary.com/dgyykbmt6/image/upload/v1778398642/WhatsApp_Image_2026-05-10_at_13.06.16_vgp1do.jpg" alt="Customer Service" />
          </div>
        </div>
      </section>

      {/* FULLSCREEN */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div className="pd-fullscreen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} onClick={() => setIsFullscreen(false)}>
            <motion.div className="pd-fullscreen-inner" onClick={e => e.stopPropagation()}
              initial={{ scale: 0.88 }} animate={{ scale: 1 }} exit={{ scale: 0.88 }}>
              <button className="fs-close" onClick={() => setIsFullscreen(false)}><FiX /></button>
              <AnimatePresence mode="wait">
                <motion.img key={selectedImage} src={images[selectedImage]} alt="fullscreen"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              </AnimatePresence>
              {images.length > 1 && (
                <div className="fs-nav">
                  <button onClick={prevImage}><FiChevronLeft /></button>
                  <span>{selectedImage + 1} / {images.length}</span>
                  <button onClick={nextImage}><FiChevronRight /></button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
