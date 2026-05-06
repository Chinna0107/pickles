import { motion } from 'framer-motion';

export default function CustomerProfile() {
  const customer = JSON.parse(localStorage.getItem('customerData') || '{}');
  const initial = (customer.email || 'C')[0].toUpperCase();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="dash-profile-card">
        <div className="dash-profile-avatar-lg">{initial}</div>
        <div className="dash-profile-info">
          <div className="dash-info-row"><span>Email</span><strong>{customer.email || '—'}</strong></div>
          <div className="dash-info-row"><span>Mobile</span><strong>{customer.mobile || '—'}</strong></div>
        </div>
      </div>
    </motion.div>
  );
}
