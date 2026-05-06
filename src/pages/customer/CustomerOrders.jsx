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

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    fetch(`${API}/orders/my`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="dash-loading-inline"><div className="dash-spinner" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="dash-orders-list">
        {orders.length === 0
          ? <div className="dash-empty">No orders yet. <Link to="/products">Start shopping!</Link></div>
          : orders.map(order => {
              const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
              const color = STATUS_COLOR[order.status] || '#6b7280';
              return (
                <div key={order.id} className="dash-order-card">
                  <div className="dash-order-header">
                    <div>
                      <span className="dash-order-id">Order #{order.id}</span>
                      <span className="dash-order-date">{new Date(order.created_at).toLocaleDateString('en-IN')}</span>
                    </div>
                    <span className="dash-order-status" style={{ background: color + '20', color }}>
                      {STATUS_ICON[order.status]} {order.status}
                    </span>
                  </div>
                  <div className="dash-order-items">
                    {Array.isArray(items) && items.map((item, i) => (
                      <div key={i} className="dash-order-item">
                        <span>{item.emoji || '🫙'} {item.name}</span>
                        <span>{item.selectedWeight} × {item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="dash-order-footer">
                    <span>Total: <strong>₹{parseFloat(order.total).toFixed(0)}</strong></span>
                    {order.address && <span style={{ fontSize: 12, color: '#6b7280' }}>📍 {order.address}</span>}
                    {order.coupon && <span className="dash-coupon">Coupon: {order.coupon}</span>}
                  </div>
                </div>
              );
            })
        }
      </div>
    </motion.div>
  );
}
