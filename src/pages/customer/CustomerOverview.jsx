import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi';
import API from '../../config';

const STATUS_ICON = {
  pending: <FiClock />, confirmed: <FiCheckCircle />, processing: <FiPackage />,
  shipped: <FiTruck />, delivered: <FiCheckCircle />, cancelled: <FiXCircle />,
};
const STATUS_COLOR = {
  pending: '#f59e0b', confirmed: '#3b82f6', processing: '#8b5cf6',
  shipped: '#06b6d4', delivered: '#10b981', cancelled: '#ef4444',
};

export default function CustomerOverview() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    fetch(`${API}/customer/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setOrders(d.orders || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="dash-loading-inline"><div className="dash-spinner" /></div>;

  const totalSpent = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + parseFloat(o.total || 0), 0);
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const pending = orders.filter(o => ['pending', 'confirmed', 'processing', 'shipped'].includes(o.status)).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="dash-stats">
        {[
          { label: 'Total Orders', value: orders.length, icon: '📦', color: '#3b82f6' },
          { label: 'Delivered', value: delivered, icon: '✅', color: '#10b981' },
          { label: 'Active Orders', value: pending, icon: '🚚', color: '#f59e0b' },
          { label: 'Total Spent', value: `₹${totalSpent.toFixed(0)}`, icon: '💰', color: '#8b5cf6' },
        ].map((s, i) => (
          <motion.div key={i} className="dash-stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="dash-stat-icon" style={{ background: s.color + '20', color: s.color }}>{s.icon}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="dash-section-title">Recent Orders</div>
      <div className="dash-orders-list">
        {orders.length === 0
          ? <div className="dash-empty">No orders yet. <Link to="/products">Start shopping!</Link></div>
          : orders.slice(0, 5).map(order => <OrderCard key={order.id} order={order} STATUS_ICON={STATUS_ICON} STATUS_COLOR={STATUS_COLOR} />)
        }
      </div>
    </motion.div>
  );
}

export function OrderCard({ order, STATUS_ICON, STATUS_COLOR, expanded }) {
  const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
  const color = STATUS_COLOR[order.status] || '#6b7280';
  return (
    <div className="dash-order-card">
      <div className="dash-order-header">
        <div>
          <span className="dash-order-id">Order #{order.id}</span>
          <span className="dash-order-date">{new Date(order.created_at).toLocaleDateString('en-IN')}</span>
        </div>
        <span className="dash-order-status" style={{ background: color + '20', color }}>
          {STATUS_ICON[order.status]} {order.status}
        </span>
      </div>
      {expanded && Array.isArray(items) && (
        <div className="dash-order-items">
          {items.map((item, i) => (
            <div key={i} className="dash-order-item">
              <span>{item.emoji || '🫙'} {item.name}</span>
              <span>{item.selectedWeight} × {item.qty}</span>
            </div>
          ))}
        </div>
      )}
      <div className="dash-order-footer">
        <span>Total: <strong>₹{parseFloat(order.total).toFixed(0)}</strong></span>
        {order.coupon && <span className="dash-coupon">Coupon: {order.coupon}</span>}
      </div>
    </div>
  );
}
