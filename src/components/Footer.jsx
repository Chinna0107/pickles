import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import logo from '../assets/logo.jpeg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#1a1400" />
        </svg>
      </div>
      <div className="footer-body">
        <div className="container footer-grid">

          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="OM Pickles Logo" className="footer-logo-img" />
              <div>
                <div className="footer-logo-name">OM PICKLES</div>
                <div className="footer-logo-tagline">& Foods</div>
              </div>
            </div>
            <p>Authentic Andhra pickles crafted with love, tradition, and the finest ingredients. Bringing the taste of home to your table since 2018.</p>
            <div className="footer-socials">
              <a href="#" className="social-btn"><FiInstagram /></a>
              <a href="#" className="social-btn"><FiFacebook /></a>
              <a href="#" className="social-btn"><FiYoutube /></a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Customer Login</Link></li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/products?cat=veg">Veg Pickles</Link></li>
              <li><Link to="/products?cat=nonveg">Non-Veg Pickles</Link></li>
              <li><Link to="/products?cat=karam">Karam Podi</Link></li>
            </ul>
          </div>

          {/* POLICIES */}
          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/refund-policy">Refund &amp; Returns</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
            </ul>
            <div className="footer-razorpay">
              <div className="footer-razorpay-label">Payments secured by</div>
              <div className="footer-razorpay-badge">💳 <span>Razorpay</span></div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>
                <FiPhone />
                <a href="tel:+918142128079">+91 8142128079</a>
              </li>
              <li>
                <FiMail />
                <a href="mailto:ompicklesandfoodss@gmail.com">ompicklesandfoodss@gmail.com</a>
              </li>
              <li>
                <FiMapPin />
                <span>Gachibowli, Hyderabad, 500032</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© 2025 OM Pickles &amp; Foods. All rights reserved. | Owner: <strong>Beemanaboina Sridevi</strong></p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy</Link>
              <span>·</span>
              <Link to="/terms-conditions">Terms</Link>
              <span>·</span>
              <Link to="/refund-policy">Refunds</Link>
              <span>·</span>
              <Link to="/shipping-policy">Shipping</Link>
            </div>
            <p>Made with ❤️ in Hyderabad</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
