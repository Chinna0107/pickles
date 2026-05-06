import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../config';

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'application/json' });

const STATUS_COLOR = {
  pending: '#f59e0b', confirmed: '#3b82f6', processing: '#8b5cf6',
  shipped: '#06b6d4', delivered: '#10b981', cancelled: '#ef4444',
};

export default function AdminReports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`${API}/reports`, { headers: authHeader() }).then(r => r.json()).then(setReport);
  }, []);

  if (!report) return <div className="dash-loading-inline"><div className="dash-spinner" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="dash-reports-grid">
        <div className="dash-report-card">
          <h3>👥 Customer Stats</h3>
          <div className="dash-report-row"><span>Total Customers</span><strong>{report.customerStats?.total_customers}</strong></div>
          <div className="dash-report-row"><span>New This Month</span><strong>{report.customerStats?.new_this_month}</strong></div>
        </div>

        <div className="dash-report-card">
          <h3>📦 Orders by Status</h3>
          {report.salesByStatus?.map(s => (
            <div key={s.status} className="dash-report-row">
              <span><span className="dash-badge" style={{ background: (STATUS_COLOR[s.status] || '#6b7280') + '20', color: STATUS_COLOR[s.status] || '#6b7280' }}>{s.status}</span></span>
              <strong>{s.count} orders · ₹{parseFloat(s.revenue).toFixed(0)}</strong>
            </div>
          ))}
        </div>

        <div className="dash-report-card">
          <h3>🏆 Top Products</h3>
          {report.topProducts?.map((p, i) => (
            <div key={i} className="dash-report-row">
              <span>#{i + 1} {p.product}</span>
              <strong>{p.qty_sold} sold</strong>
            </div>
          ))}
        </div>

        <div className="dash-report-card full-width">
          <h3>📅 Monthly Revenue</h3>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead><tr><th>Month</th><th>Orders</th><th>Revenue</th></tr></thead>
              <tbody>
                {report.monthlySales?.map(m => (
                  <tr key={m.month}><td>{m.month}</td><td>{m.orders}</td><td>₹{parseFloat(m.revenue).toFixed(0)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-report-card full-width">
          <h3>📈 Last 7 Days</h3>
          <div className="dash-bar-chart">
            {report.dailySales?.map((d, i) => {
              const max = Math.max(...report.dailySales.map(x => parseFloat(x.revenue)));
              const pct = max > 0 ? (parseFloat(d.revenue) / max) * 100 : 0;
              return (
                <div key={i} className="dash-bar-col">
                  <div className="dash-bar-value">₹{parseFloat(d.revenue).toFixed(0)}</div>
                  <div className="dash-bar" style={{ height: `${Math.max(pct, 4)}%` }} />
                  <div className="dash-bar-label">{new Date(d.date).toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
