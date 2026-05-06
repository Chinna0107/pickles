import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../config';

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'application/json' });

const STATUS_COLOR = {
  pending: '#f59e0b', confirmed: '#3b82f6', processing: '#8b5cf6',
  shipped: '#06b6d4', delivered: '#10b981', cancelled: '#ef4444',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    const url = filter ? `${API}/orders?status=${filter}` : `${API}/orders`;
    fetch(url, { headers: authHeader() })
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); });
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/orders/${id}/status`, { method: 'PUT', headers: authHeader(), body: JSON.stringify({ status }) });
    load();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="dash-actions-bar">
        <div className="dash-filter-tabs">
          {['', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button key={s} className={`dash-filter-tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? <div className="dash-loading-inline"><div className="dash-spinner" /></div> : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead><tr><th>ID</th><th>Customer</th><th>Address</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Update</th></tr></thead>
            <tbody>
              {orders.map(o => {
                const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
                return (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>
                      <div>{o.email || '—'}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{o.mobile}</div>
                    </td>
                    <td style={{ fontSize: 12, maxWidth: 160 }}>{o.address || '—'}</td>
                    <td style={{ fontSize: 12 }}>{Array.isArray(items) ? items.map(i => `${i.name} (${i.selectedWeight})`).join(', ') : '—'}</td>
                    <td>₹{parseFloat(o.total).toFixed(0)}</td>
                    <td><span className="dash-badge" style={{ background: (STATUS_COLOR[o.status] || '#6b7280') + '20', color: STATUS_COLOR[o.status] || '#6b7280' }}>{o.status}</span></td>
                    <td>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                    <td>
                      <select className="dash-status-select" value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                        {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
