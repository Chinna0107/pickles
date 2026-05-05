import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiShoppingBag, FiSearch, FiFilter } from 'react-icons/fi';
import { products, getPriceByWeight } from '../data/products';
import './Products.css';

const categories = [
  { id: 'all', label: 'All Products', emoji: '🫙', count: products.length },
  { id: 'veg', label: 'Veg Pickles', emoji: '🥭', count: products.filter(p => p.category === 'veg').length },
  { id: 'nonveg', label: 'Non-Veg Pickles', emoji: '🍗', count: products.filter(p => p.category === 'nonveg').length },
  { id: 'karam', label: 'Karam Podi', emoji: '🌶️', count: products.filter(p => p.category === 'karam').length },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const priceA = a.prices[0].price;
      const priceB = b.prices[0].price;
      if (sort === 'price-low') return priceA - priceB;
      if (sort === 'price-high') return priceB - priceA;
      if (sort === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  return (
    <div className="products-page page-enter">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="page-hero-tag">🫙 Our Collection</span>
            <h1>Authentic Andhra Pickles</h1>
            <p>Handcrafted with love, tradition, and the finest ingredients</p>
          </motion.div>
        </div>
        <div className="page-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      <div className="container products-layout">
        {/* CATEGORIES */}
        <section className="categories-section">
          <div className="categories-grid">
            {categories.map(cat => (
              <motion.button key={cat.id}
                className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}>
                <div className="cat-emoji">{cat.emoji}</div>
                <div className="cat-label">{cat.label}</div>
                <div className="cat-count">{cat.count} items</div>
                {activeCategory === cat.id && (
                  <motion.div className="cat-active-bar" layoutId="catBar" />
                )}
              </motion.button>
            ))}
          </div>
        </section>

        {/* FILTERS */}
        <div className="filters-bar">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search pickles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="sort-box">
            <FiFilter />
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <div className="results-count">
            <span>{filtered.length} products found</span>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + search + sort}
            className="products-grid-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}>
            {filtered.length === 0 ? (
              <div className="no-results">
                <span>🔍</span>
                <h3>No products found</h3>
                <p>Try a different search or category</p>
              </div>
            ) : (
              filtered.map((product, i) => {
                const firstPrice = product.prices[0];
                const discount = Math.round(((firstPrice.originalPrice - firstPrice.price) / firstPrice.originalPrice) * 100);
                return (
                  <motion.div key={product.id} className="product-card-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    <Link to={`/products/${product.slug}`} className="product-card-link">
                      <div className="pcf-img">
                        <div className="pcf-emoji">{product.emoji}</div>
                        <div className="pcf-tag">{product.tag}</div>
                        <div className="pcf-discount">-{discount}%</div>
                        <img src={product.images[0]} alt={product.name} className="pcf-product-img" />
                      </div>
                    </Link>
                    <div className="pcf-body">
                      <div className="pcf-meta">
                        <span className="pcf-weight">{firstPrice.weight}</span>
                        <span className="pcf-spice">{'🌶️'.repeat(product.spice)}</span>
                      </div>
                      <Link to={`/products/${product.slug}`} className="product-name-link">
                        <h3>{product.name}</h3>
                      </Link>
                      <p>{product.shortDesc}</p>
                      <div className="pcf-stars">
                        {[1,2,3,4,5].map(s => (
                          <FiStar key={s} className={s <= Math.floor(product.rating) ? 'star filled' : 'star'} />
                        ))}
                        <span>{product.rating} ({product.reviews})</span>
                      </div>
                      <div className="pcf-footer">
                        <div className="pcf-prices">
                          <span className="pcf-price">₹{firstPrice.price}</span>
                          <span className="pcf-original">₹{firstPrice.originalPrice}</span>
                        </div>
                        <motion.button 
                          className="pcf-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}>
                          <FiShoppingBag />
                          <span>Add to Cart</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
