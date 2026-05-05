import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiAward, FiUsers, FiPackage } from 'react-icons/fi';
import './AboutUs.css';

const stats = [
  { icon: <FiUsers />, value: '500+', label: 'Happy Customers' },
  { icon: <FiPackage />, value: '18+', label: 'Products' },
  { icon: <FiAward />, value: '6+', label: 'Years Experience' },
  { icon: <FiHeart />, value: '100%', label: 'Natural Ingredients' },
];

const timeline = [
  { year: '2018', title: 'The Beginning', desc: 'Sridevi started making pickles from her home kitchen in Gachibowli, sharing with neighbors and friends.' },
  { year: '2020', title: 'Growing Demand', desc: 'Word spread across Hyderabad. Orders started pouring in from across the city and beyond.' },
  { year: '2022', title: 'OM Pickles Brand', desc: 'Officially launched OM Pickles & Foods with a full product line of 18+ authentic Andhra recipes.' },
  { year: '2024', title: 'Pan-India Delivery', desc: 'Now delivering to customers across India, bringing authentic Andhra taste to every home.' },
];

export default function AboutUs() {
  return (
    <div className="about-page page-enter">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="page-hero-tag">🌿 Our Story</span>
            <h1>About OM Pickles</h1>
            <p>A journey of passion, tradition, and authentic Andhra flavors</p>
          </motion.div>
        </div>
        <div className="page-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="founder-section">
        <div className="container founder-grid">
          <motion.div className="founder-visual"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className="founder-img-wrap">
              <div className="founder-img-bg" />
              <div className="founder-img-main">
                <div className="founder-avatar-big">
                  <span>👩</span>
                  <div className="founder-glow" />
                </div>
                <div className="founder-floating f1">🫙</div>
                <div className="founder-floating f2">🌶️</div>
                <div className="founder-floating f3">🥭</div>
              </div>
              <div className="founder-name-card">
                <div className="fnc-name">Beemanaboina Sridevi</div>
                <div className="fnc-title">Founder & Owner</div>
                <div className="fnc-badge">🏆 Master Pickle Maker</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="founder-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className="section-title" style={{ textAlign: 'left', marginBottom: 28 }}>
              <span className="tag">Meet the Founder</span>
              <h2>The Heart Behind<br />Every Jar</h2>
            </div>
            <p className="founder-bio">
              <strong>Beemanaboina Sridevi</strong> is the passionate founder of OM Pickles & Foods, based in Gachibowli, Hyderabad. With a deep love for traditional Andhra cuisine and a desire to preserve authentic recipes, she turned her kitchen passion into a thriving business.
            </p>
            <p className="founder-bio">
              Growing up in a family where food was the language of love, Sridevi learned the art of pickle-making from her grandmother. Each recipe carries the essence of Andhra's rich culinary heritage — bold spices, tangy flavors, and the warmth of home cooking.
            </p>
            <p className="founder-bio">
              Today, she personally oversees every batch of pickles, ensuring that the quality, taste, and tradition remain unchanged. Her dedication to using only natural ingredients and zero preservatives has earned OM Pickles a loyal customer base across India.
            </p>
            <div className="founder-quote">
              <div className="quote-mark">"</div>
              <p>Every jar I make carries a piece of my heart and the flavors of my grandmother's kitchen. I want every family to experience the authentic taste of Andhra.</p>
              <div className="quote-author">— Beemanaboina Sridevi</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-bg" />
        <div className="container stats-grid">
          {stats.map((s, i) => (
            <motion.div key={i} className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mv-section">
        <div className="container mv-grid">
          <motion.div className="mv-card mission"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className="mv-icon">
              <FiTarget />
            </div>
            <div className="mv-tag">Our Mission</div>
            <h2>Preserving Tradition,<br />One Jar at a Time</h2>
            <p>Our mission is to bring the authentic taste of traditional Andhra pickles to every household across India. We are committed to:</p>
            <ul className="mv-list">
              <li>🌿 Using only 100% natural, farm-fresh ingredients</li>
              <li>🚫 Zero artificial preservatives or additives</li>
              <li>👩‍🍳 Maintaining traditional recipes passed down through generations</li>
              <li>🤝 Supporting local farmers and sustainable sourcing</li>
              <li>❤️ Delivering consistent quality with every order</li>
            </ul>
          </motion.div>

          <motion.div className="mv-card vision"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="mv-icon vision-icon">
              <FiEye />
            </div>
            <div className="mv-tag vision-tag">Our Vision</div>
            <h2>Andhra's Finest Pickles,<br />Loved Worldwide</h2>
            <p>We envision OM Pickles & Foods becoming the most trusted name in authentic Indian pickles, recognized for:</p>
            <ul className="mv-list">
              <li>🌍 Reaching pickle lovers across the globe</li>
              <li>🏆 Setting the gold standard for authentic Andhra pickles</li>
              <li>🌱 Building a sustainable, eco-friendly food brand</li>
              <li>👨‍👩‍👧 Empowering local women entrepreneurs in food industry</li>
              <li>✨ Innovating while preserving the essence of tradition</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-title">
            <span className="tag">Our Journey</span>
            <h2>From Kitchen to Kitchens Across India</h2>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </motion.div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section">
        <div className="container">
          <div className="section-title">
            <span className="tag">What We Stand For</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            {[
              { emoji: '🌿', title: 'Natural & Pure', desc: 'No artificial colors, flavors, or preservatives. Ever.' },
              { emoji: '👩‍🍳', title: 'Handcrafted', desc: 'Every batch is made by hand with personal attention to quality.' },
              { emoji: '🏡', title: 'Home-Style', desc: 'Recipes that taste exactly like your grandmother\'s kitchen.' },
              { emoji: '🤝', title: 'Trust & Transparency', desc: 'We believe in honest ingredients and honest pricing.' },
              { emoji: '🌍', title: 'Sustainability', desc: 'Eco-friendly packaging and responsible sourcing.' },
              { emoji: '❤️', title: 'Made with Love', desc: 'Passion and care go into every single jar we make.' },
            ].map((v, i) => (
              <motion.div key={i} className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}>
                <div className="value-emoji">{v.emoji}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
