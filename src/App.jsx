import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import './index.css';

const NO_LAYOUT = ['/customer/dashboard', '/admin/dashboard'];

function Layout({ children }) {
  const path = window.location.pathname;
  const hide = NO_LAYOUT.some(p => path.startsWith(p));
  return hide ? <>{children}</> : (<><Header /><main>{children}</main><Footer /></>);
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
