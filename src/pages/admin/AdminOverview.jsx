import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../config';

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'application/json' });

const STATUS_COLOR = {
  pending: '#f59e0b', confirmed: '#3b82f6', processing: '#8b5cf6',
  shipped: '#06b6d4', delivered: '#10b981', cancelled: '#ef4444',
};

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetch(`${API}/admin/dashboard`, { headers: authHeader() })
      .then(r => r.json())
      .then(d => { setStats(d.stats); setRecentOrders(d.recentOrders || []); });
  }, []);

  if (!stats) return <div className="dash-loading-inline"><div className="dash-spinner" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="dash-stats">
        {[
          { label: 'Total Orders', value: stats.totalOrders, icon: '📦', color: '#3b82f6' },
          { label: 'Customers', value: stats.totalCustomers, icon: '👥', color: '#10b981' },
          { label: 'Products', value: stats.totalProducts, icon: '🫙', color: '#f59e0b' },
          { label: 'Revenue', value: `₹${parseFloat(stats.revenue).toFixed(0)}`, icon: '💰', color: '#8b5cf6' },
        ].map((s, i) => (
          <motion.div key={i} className="dash-stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="dash-stat-icon" style={{ background: s.color + '20', color: s.color }}>{s.icon}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="dash-section-title">Recent Orders</div>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>
                  <div>{o.email || '—'}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{o.mobile}</div>
                </td>
                <td>₹{parseFloat(o.total).toFixed(0)}</td>
                <td><span className="dash-badge" style={{ background: (STATUS_COLOR[o.status] || '#6b7280') + '20', color: STATUS_COLOR[o.status] || '#6b7280' }}>{o.status}</span></td>
                <td>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
