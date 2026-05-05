import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock, FiInstagram, FiFacebook } from 'react-icons/fi';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page page-enter">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="page-hero-tag">📞 Get in Touch</span>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Reach out for orders, queries, or just to say hello!</p>
          </motion.div>
        </div>
        <div className="page-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      <div className="container contact-layout">
        {/* CONTACT INFO */}
        <motion.div className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="contact-info-header">
            <h2>Let's Connect</h2>
            <p>Have a question about our pickles? Want to place a bulk order? We're here to help!</p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="cc-icon phone-icon"><FiPhone /></div>
              <div>
                <div className="cc-label">Call / WhatsApp</div>
                <a href="tel:+918142128079" className="cc-value">+91 8142128079</a>
                <div className="cc-sub">Available 9 AM – 8 PM</div>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon mail-icon"><FiMail /></div>
              <div>
                <div className="cc-label">Email Us</div>
                <a href="mailto:ompicklesandfoodss@gmail.com" className="cc-value">ompicklesandfoodss@gmail.com</a>
                <div className="cc-sub">We reply within 24 hours</div>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon map-icon"><FiMapPin /></div>
              <div>
                <div className="cc-label">Our Location</div>
                <div className="cc-value">Gachibowli, Hyderabad</div>
                <div className="cc-sub">Telangana – 500032</div>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon clock-icon"><FiClock /></div>
              <div>
                <div className="cc-label">Business Hours</div>
                <div className="cc-value">Mon – Sat: 9 AM – 8 PM</div>
                <div className="cc-sub">Sunday: 10 AM – 5 PM</div>
              </div>
            </div>
          </div>

          <div className="owner-card">
            <div className="owner-avatar">BS</div>
            <div>
              <div className="owner-name">Beemanaboina Sridevi</div>
              <div className="owner-title">Founder & Owner, OM Pickles & Foods</div>
            </div>
          </div>

          <div className="contact-socials">
            <span>Follow us:</span>
            <a href="#" className="social-link"><FiInstagram /> Instagram</a>
            <a href="#" className="social-link"><FiFacebook /> Facebook</a>
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.div className="contact-form-wrap"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="form-header">
            <h2>Send a Message</h2>
            <p>Fill in the form and we'll get back to you shortly</p>
          </div>

          {sent && (
            <motion.div className="success-msg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}>
              ✅ Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input type="text" placeholder="Enter your name" required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="your@email.com" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                <option value="">Select a subject</option>
                <option>Place an Order</option>
                <option>Bulk Order Inquiry</option>
                <option>Product Query</option>
                <option>Delivery Issue</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea placeholder="Tell us how we can help you..." rows={5} required
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit" className="submit-btn">
              <FiSend />
              <span>Send Message</span>
            </button>
          </form>
        </motion.div>
      </div>

      {/* MAP SECTION */}
      <section className="map-section">
        <div className="container">
          <div className="map-placeholder">
            <div className="map-overlay">
              <div className="map-pin">📍</div>
              <h3>OM Pickles & Foods</h3>
              <p>Gachibowli, Hyderabad, Telangana – 500032</p>
              <a href="https://maps.google.com/?q=Gachibowli,Hyderabad" target="_blank" rel="noreferrer" className="btn-primary">
                <FiMapPin />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
