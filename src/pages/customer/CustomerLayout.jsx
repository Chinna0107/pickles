import { useEffect } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { FiShoppingBag, FiPackage, FiUser, FiLogOut } from 'react-icons/fi';
import logo from '../../assets/logo.jpeg';
import '../Dashboard.css';

const tabs = [
  { path: '/customer/dashboard', icon: <FiShoppingBag />, label: 'Overview' },
  { path: '/customer/orders', icon: <FiPackage />, label: 'My Orders' },
  { path: '/customer/profile', icon: <FiUser />, label: 'Profile' },
];

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');

  useEffect(() => {
    if (!localStorage.getItem('customerToken')) navigate('/login');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerData');
    navigate('/login');
  };

  const initial = (customerData.email || 'C')[0].toUpperCase();

  return (
    <div className="dash-page">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <div className="dash-brand-logo">
            <img src={logo} alt="OM Pickles" className="dash-brand-logo-img" />
          </div>
          <div>
            <div className="dash-brand-name">OM Pickles</div>
            <div className="dash-brand-sub">Customer Portal</div>
          </div>
        </div>

        <div className="dash-profile">
          <div className="dash-avatar">{initial}</div>
          <div>
            <div className="dash-profile-name">{customerData.name || 'Customer'}</div>
            <div className="dash-profile-email">{customerData.email}</div>
          </div>
        </div>

        <nav className="dash-nav">
          {tabs.map(t => (
            <Link key={t.path} to={t.path}
              className={`dash-nav-item ${location.pathname === t.path ? 'active' : ''}`}>
              {t.icon} {t.label}
            </Link>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <Link to="/products" className="dash-nav-item">🛍️ Shop Now</Link>
          <button className="dash-nav-item logout" onClick={logout}><FiLogOut /> Logout</button>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <h1 className="dash-page-title">
            {tabs.find(t => location.pathname === t.path)?.label || 'Dashboard'}
          </h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
