import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiStar, FiShoppingBag, FiAward, FiTruck, FiShield, FiHeart } from 'react-icons/fi';
import { testimonials } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import './Home.css';

const banners = [
  {
    id: 1,
    tag: 'Authentic Andhra Taste',
    title: 'Handcrafted Pickles',
    subtitle: 'Made with Love & Tradition',
    desc: 'Experience the rich flavors of traditional Andhra pickles, crafted with secret family recipes passed down through generations.',
    cta: 'Shop Now',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #3d1a0a 50%, #c8102e22 100%)',
    accent: '#c8102e',
    images: [
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778404515/WhatsApp_Image_2026-05-10_at_14.44.31_4_eqhu5p.jpg',
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778405461/WhatsApp_Image_2026-05-10_at_14.56.05_sncsrn.jpg',
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778405462/WhatsApp_Image_2026-05-10_at_14.56.05_1_qyx6ms.jpg',
    ],
    badge: '100% Natural',
  },
  {
    id: 2,
    tag: 'Premium Non-Veg Collection',
    title: 'Spicy Chicken & Mutton',
    subtitle: 'Pickles That Tell a Story',
    desc: 'Tender meats marinated in our signature Andhra spice blend. Bold, fiery, and absolutely irresistible.',
    cta: 'Explore Now',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2d 50%, #6b21a822 100%)',
    accent: '#d4a017',
    images: [

      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778404515/WhatsApp_Image_2026-05-10_at_14.44.31_u6ztzv.jpg',
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778404516/WhatsApp_Image_2026-05-10_at_14.44.31_1_uvlhut.jpg',
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778404515/WhatsApp_Image_2026-05-10_at_14.44.31_3_tqqkl4.jpg',
    ],
    badge: "Chef's Special",
  },
  {
    id: 3,
    tag: 'Karam Podi Collection',
    title: 'Aromatic Spice Powders',
    subtitle: 'The Soul of Andhra Cuisine',
    desc: 'From Kandi Podi to Mirchi Karam — our spice powders transform every meal into a feast.',
    cta: 'Discover More',
    bg: 'linear-gradient(135deg, #0a1a00 0%, #1a2d0a 50%, #16a34a22 100%)',
    accent: '#22c55e',
    images: [
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778404515/WhatsApp_Image_2026-05-10_at_14.44.31_2_zsviyl.jpg',
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778405462/WhatsApp_Image_2026-05-10_at_14.56.06_dbvxz4.jpg',
      'https://res.cloudinary.com/dgyykbmt6/image/upload/v1778405462/WhatsApp_Image_2026-05-10_at_14.56.06_1_viotd3.jpg',
    ],
    badge: 'Farm Fresh',
  },
];

const features = [
  { icon: <FiAward />, title: 'Premium Quality', desc: 'Finest ingredients sourced directly from farms' },
  { icon: <FiShield />, title: 'No Preservatives', desc: '100% natural, traditional recipes only' },
  { icon: <FiTruck />, title: 'Fast Delivery', desc: 'Pan-India delivery within 3-5 days' },
  { icon: <FiHeart />, title: 'Made with Love', desc: 'Every jar crafted with care & passion' },
];

const storyPoints = [
  { icon: '🌿', title: 'Farm-to-Jar Freshness', desc: 'We source the freshest mangoes, chillies, and spices directly from local farmers in Andhra Pradesh.' },
  { icon: '👩‍🍳', title: 'Traditional Recipes', desc: 'Every recipe is a secret passed down through generations, preserving the authentic Andhra flavor.' },
  { icon: '❤️', title: 'Made with Passion', desc: 'Founder Sridevi personally oversees every batch to ensure consistent quality and taste.' },
];

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function AnimatedStat({ value, suffix = '', label, accent }) {
  const num = useCountUp(value);
  return (
    <div className="hc-stat-inner">
      <strong style={{ color: accent || 'var(--gold)' }}>{num}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <FiStar key={i} className={i <= Math.floor(rating) ? 'star filled' : 'star'} />
      ))}
      <span>{rating}</span>
    </div>
  );
}

function ProductCard({ product, delay = 0 }) {
  const firstPrice = product.prices?.[0] || { weight: '', price: 0, originalPrice: 0 };
  const discount = firstPrice.originalPrice ? Math.round(((firstPrice.originalPrice - firstPrice.price) / firstPrice.originalPrice) * 100) : 0;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, firstPrice.weight, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  return (
    <motion.div className="product-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}>
      <Link to={`/products/${product.slug}`} className="product-card-img-link">
        <div className="product-card-img">
          <img src={product.images?.[0]} alt={product.name} className="product-real-img" />
          <div className="product-img-overlay" />
          <div className="product-tag">{product.tag}</div>
          <div className="product-discount">-{discount}%</div>
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-weight">{firstPrice.weight}</div>
        <Link to={`/products/${product.slug}`}><h3>{product.name}</h3></Link>
        <p>{product.short_desc}</p>
        <div className="spice-level">
          {'🌶️'.repeat(product.spice)}{'⬜'.repeat(5 - product.spice)}
        </div>
        <StarRating rating={product.rating} />
        <div className="product-footer">
          <div className="price-group">
            <span className="price">₹{firstPrice.price}</span>
            <span className="original-price">₹{firstPrice.originalPrice}</span>
          </div>
          <motion.button className={`add-btn ${added ? 'added' : ''}`} onClick={handleAdd} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <FiShoppingBag />
            <span>{added ? '✓' : 'Add'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  useSEO({
    title: 'Authentic Andhra Pickles — Buy Online India',
    description: 'Buy authentic Andhra pickles online — Mango Avakaya, Gongura Pachadi, Chicken Pickle, Mutton Pickle, Karam Podi & more. Handcrafted by Beemanaboina Sridevi. Free delivery across India.',
    canonical: '/',
  });
  const { products, loading } = useProducts();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featured = products.filter(p => ['Bestseller', 'Popular'].includes(p.tag)).slice(0, 4);
  const bestSelling = [...products].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 4);

  useEffect(() => {
    const t = setInterval(() => setCurrentBanner(p => (p + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const banner = banners[currentBanner];

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) setCurrentBanner(p => (p + 1) % banners.length);
    else if (info.offset.x > 60) setCurrentBanner(p => (p - 1 + banners.length) % banners.length);
  };

  return (
    <div className="home page-enter">

      {/* HERO */}
      <section className="hero">
        <AnimatePresence mode="wait">
          <motion.div key={currentBanner} className="hero-bg"
            style={{ background: banner.bg }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}>
            <div className="hero-particles">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="particle" style={{ '--i': i }} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="container hero-content">

          {/* VISUAL — order-1 on mobile so it shows first */}
          <motion.div className="hero-visual"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}>
            <div className="hero-collage">
              <div className="hero-collage-inner">
                <AnimatePresence mode="wait">
                  <motion.div key={`top-${currentBanner}`} className="hc-img hc-img--top"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}>
                    <img src={banner.images[0]} alt={banner.title} />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={`mid-${currentBanner}`} className="hc-img hc-img--mid"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}>
                    <img src={banner.images[1]} alt="" />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={`bot-${currentBanner}`} className="hc-img hc-img--bot"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}>
                    <img src={banner.images[2]} alt="" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* <motion.div className="hc-stat hc-stat--tl"
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.45 }}>
                <AnimatedStat value={500} suffix="+" label="Happy Customers" accent={banner.accent} />
              </motion.div>
              <motion.div className="hc-stat hc-stat--tr"
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.6 }}>
                <AnimatedStat value={18} suffix="+" label="Products" accent={banner.accent} />
              </motion.div>
              <motion.div className="hc-stat hc-stat--br"
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.75 }}>
                <AnimatedStat value={5} suffix="★" label="Avg Rating" accent={banner.accent} />
              </motion.div> */}
            </div>
            {/* mobile swipe hint */}
            <div className="hero-swipe-hint">
              {banners.map((_, i) => (
                <motion.div key={i} className="swipe-bar"
                  animate={{ width: i === currentBanner ? 28 : 8, opacity: i === currentBanner ? 1 : 0.35 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: i === currentBanner ? banner.accent : 'rgba(255,255,255,0.5)' }}
                />
              ))}
            </div>
          </motion.div>

          {/* TEXT — order-2 on mobile so it shows after image */}
          <AnimatePresence mode="wait">
            <motion.div key={currentBanner} className="hero-text"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.7 }}>
              <div className="hero-tag">
                <span className="tag-dot" style={{ background: banner.accent }} />
                {banner.tag}
              </div>
              <h1 className="hero-title">{banner.title}</h1>
              <p className="hero-subtitle">{banner.subtitle}</p>
              <p className="hero-desc">{banner.desc}</p>
              <div className="hero-badge">
                <span>✨ {banner.badge}</span>
              </div>
              <div className="hero-actions">
                <Link to="/products" className="btn-primary">
                  <span>{banner.cta}</span>
                  <FiArrowRight />
                </Link>
                <Link to="/about" className="btn-outline-hero">Our Story</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-trust-pill">
          <span>🚚</span> Free delivery - For a limited period !
        </div>

        <motion.div className="hero-scroll-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <div className="scroll-arrow" />
        </motion.div>

        <div className="banner-dots">
          {banners.map((_, i) => (
            <button key={i} className={`dot ${i === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(i)} />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <motion.section className="features-strip"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}>
        <div className="container features-grid">
          {features.map((f, i) => (
            <motion.div key={i} className="feature-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}>
              <div className="feature-icon">{f.icon}</div>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* OUR STORY */}
      <section className="story-section">
        <div className="container story-grid">
          <motion.div className="story-visual"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <div className="story-img-wrap">
              <div className="story-img-bg" />
              <div className="story-img-main">
                <img
                  src="https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=600&h=600&fit=crop"
                  alt="Traditional pickle making"
                  className="story-real-img"
                />
              </div>
              <div className="story-badge-card">
                <div className="badge-year">2018</div>
                <div className="badge-text">Est. in Hyderabad</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="story-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <div className="section-title" style={{ textAlign: 'left', marginBottom: 32 }}>
              <span className="tag">Our Story</span>
              <h2>A Taste Born from<br />Grandmother's Kitchen</h2>
              <p>What started as a family tradition in a small kitchen in Hyderabad has grown into a beloved brand trusted by thousands of families across India.</p>
            </div>
            <div className="story-points">
              {storyPoints.map((pt, i) => (
                <motion.div key={i} className="story-point"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}>
                  <div className="point-icon">{pt.icon}</div>
                  <div><h4>{pt.title}</h4><p>{pt.desc}</p></div>
                </motion.div>
              ))}
            </div>
            <Link to="/about" className="btn-primary" style={{ marginTop: 8 }}>
              <span>Read Full Story</span>
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="products-section">
        <div className="container">
          <motion.div className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}>
            <span className="tag">Handpicked for You</span>
            <h2>Featured Products</h2>
            <p>Our most loved pickles and spice powders, crafted with the finest ingredients</p>
          </motion.div>
          <div className="products-grid">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.1} />)}
          </div>
          <motion.div style={{ textAlign: 'center', marginTop: 48 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <Link to="/products" className="btn-primary">
              <span>View All Products</span>
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BEST SELLING */}
      <section className="bestselling-section">
        <div className="bestselling-bg" />
        <div className="container">
          <motion.div className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}>
            <span className="tag">Customer Favorites</span>
            <h2>Best Selling Products</h2>
            <p>The most ordered pickles by our loyal customers — tried, tested, and loved</p>
          </motion.div>
          <div className="products-grid">
            {bestSelling.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}>
            <span className="tag">What Customers Say</span>
            <h2>Loved Across India</h2>
            <p>Real reviews from real pickle lovers</p>
          </motion.div>

          <div className="testimonials-wrapper">
            <div className="testimonials-track">
              {testimonials.map((t, i) => (
                <motion.div key={t.id} className={`testimonial-card ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -8 }}>
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-stars">{'⭐'.repeat(t.rating)}</div>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.avatar}</div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-city">📍 {t.city}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="container cta-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}>
            <span className="cta-emoji">🌶️</span>
            <h2>Ready to Taste Authentic Andhra?</h2>
            <p>Order now and get free delivery on orders above ₹499. Fresh pickles delivered to your doorstep!</p>
            <div className="cta-actions">
              <Link to="/products" className="btn-primary">
                <span>Order Now</span>
                <FiArrowRight />
              </Link>
              <a href="tel:+918142128079" className="btn-outline-white">
                <FiShoppingBag />
                <span>Call to Order</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
