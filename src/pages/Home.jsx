import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiStar, FiShoppingBag, FiAward, FiTruck, FiShield, FiHeart } from 'react-icons/fi';
import { products, testimonials } from '../data/products';
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
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=700&h=700&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=700&h=700&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=700&h=700&fit=crop',
    badge: 'Farm Fresh',
  },
];

const features = [
  { icon: <FiAward />, title: 'Premium Quality', desc: 'Finest ingredients sourced directly from farms' },
  { icon: <FiShield />, title: 'No Preservatives', desc: '100% natural, traditional recipes only' },
  { icon: <FiTruck />, title: 'Fast Delivery', desc: 'Pan-India delivery within 3-5 days' },
  { icon: <FiHeart />, title: 'Made with Love', desc: 'Every jar crafted with care & passion' },
];

const featured = products.filter(p => ['Bestseller', 'Popular'].includes(p.tag)).slice(0, 4);
const bestSelling = products.sort((a, b) => b.reviews - a.reviews).slice(0, 4);

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
  const firstPrice = product.prices[0];
  const discount = Math.round(((firstPrice.originalPrice - firstPrice.price) / firstPrice.originalPrice) * 100);
  return (
    <motion.div className="product-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}>
      <Link to={`/products/${product.id}`} className="product-card-img-link">
        <div className="product-card-img">
          <img src={product.images[0]} alt={product.name} className="product-real-img" />
          <div className="product-img-overlay" />
          <div className="product-tag">{product.tag}</div>
          <div className="product-discount">-{discount}%</div>
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-weight">{firstPrice.weight}</div>
        <Link to={`/products/${product.id}`}><h3>{product.name}</h3></Link>
        <p>{product.shortDesc}</p>
        <div className="spice-level">
          {'🌶️'.repeat(product.spice)}{'⬜'.repeat(5 - product.spice)}
        </div>
        <StarRating rating={product.rating} />
        <div className="product-footer">
          <div className="price-group">
            <span className="price">₹{firstPrice.price}</span>
            <span className="original-price">₹{firstPrice.originalPrice}</span>
          </div>
          <motion.button className="add-btn" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <FiShoppingBag />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrentBanner(p => (p + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const banner = banners[currentBanner];

  return (
    <div className="home page-enter">
      {/* HERO BANNER */}
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
              <div className="hero-stats">
                <div className="stat"><strong>500+</strong><span>Happy Customers</span></div>
                <div className="stat-divider" />
                <div className="stat"><strong>18+</strong><span>Products</span></div>
                <div className="stat-divider" />
                <div className="stat"><strong>5★</strong><span>Avg Rating</span></div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div className="hero-visual"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="hero-img-wrap">
              <div className="hero-img-glow" style={{ background: banner.accent }} />
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentBanner}
                  src={banner.image}
                  alt={banner.title}
                  className="hero-product-img"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                />
              </AnimatePresence>
              <div className="hero-img-ring" style={{ borderColor: banner.accent + '55' }} />
              <div className="hero-img-badge">
                <span>✨ {banner.badge}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="banner-dots">
          {banners.map((_, i) => (
            <button key={i} className={`dot ${i === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(i)} />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-strip">
        <div className="container features-grid">
          {features.map((f, i) => (
            <motion.div key={i} className="feature-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              <div className="feature-icon">{f.icon}</div>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="story-section">
        <div className="container story-grid">
          <motion.div className="story-visual"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className="section-title" style={{ textAlign: 'left', marginBottom: 32 }}>
              <span className="tag">Our Story</span>
              <h2>A Taste Born from<br />Grandmother's Kitchen</h2>
              <p>What started as a family tradition in a small kitchen in Hyderabad has grown into a beloved brand trusted by thousands of families across India.</p>
            </div>
            <div className="story-points">
              <div className="story-point">
                <div className="point-icon">🌿</div>
                <div>
                  <h4>Farm-to-Jar Freshness</h4>
                  <p>We source the freshest mangoes, chillies, and spices directly from local farmers in Andhra Pradesh.</p>
                </div>
              </div>
              <div className="story-point">
                <div className="point-icon">👩‍🍳</div>
                <div>
                  <h4>Traditional Recipes</h4>
                  <p>Every recipe is a secret passed down through generations, preserving the authentic Andhra flavor.</p>
                </div>
              </div>
              <div className="story-point">
                <div className="point-icon">❤️</div>
                <div>
                  <h4>Made with Passion</h4>
                  <p>Founder Sridevi personally oversees every batch to ensure consistent quality and taste.</p>
                </div>
              </div>
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
          <div className="section-title">
            <span className="tag">Handpicked for You</span>
            <h2>Featured Products</h2>
            <p>Our most loved pickles and spice powders, crafted with the finest ingredients</p>
          </div>
          <div className="products-grid">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.1} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/products" className="btn-primary">
              <span>View All Products</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLING */}
      <section className="bestselling-section">
        <div className="bestselling-bg" />
        <div className="container">
          <div className="section-title">
            <span className="tag">Customer Favorites</span>
            <h2>Best Selling Products</h2>
            <p>The most ordered pickles by our loyal customers — tried, tested, and loved</p>
          </div>
          <div className="products-grid">
            {bestSelling.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-title">
            <span className="tag">What Customers Say</span>
            <h2>Loved Across India</h2>
            <p>Real reviews from real pickle lovers</p>
          </div>

          <div className="testimonials-wrapper">
            <div className="testimonials-track">
              {testimonials.map((t, i) => (
                <motion.div key={t.id} className={`testimonial-card ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}>
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-stars">
                    {'⭐'.repeat(t.rating)}
                  </div>
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

      {/* CTA BANNER */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="container cta-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
