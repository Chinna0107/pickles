import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import CloudinaryImageUpload from '../../components/CloudinaryImageUpload';
import '../../components/CloudinaryImageUpload.css';
import API from '../../config';

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 'Content-Type': 'application/json' });

const EMPTY_FORM = {
  name: '', slug: '', category: 'veg', tag: '', emoji: '', short_desc: '', full_desc: '',
  spice: 1, in_stock: true,
  prices: [{ weight: '', price: '', originalPrice: '' }],
  images: [''], benefits: [''], ingredients: [''],
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () =>
    fetch(`${API}/products`, { headers: authHeader() }).then(r => r.json()).then(setProducts);

  useEffect(() => { load(); }, []);

  const normalizeForm = (p) => ({
    ...p,
    name: p.name || '', slug: p.slug || '', tag: p.tag || '', emoji: p.emoji || '',
    short_desc: p.short_desc || '', full_desc: p.full_desc || '',
    prices: Array.isArray(p.prices) && p.prices.length ? p.prices : [{ weight: '', price: '', originalPrice: '' }],
    images: Array.isArray(p.images) && p.images.length ? p.images : [''],
    benefits: Array.isArray(p.benefits) && p.benefits.length ? p.benefits : [''],
    ingredients: Array.isArray(p.ingredients) && p.ingredients.length ? p.ingredients : [''],
  });

  const openEdit = (p) => { setEditing(p); setForm(normalizeForm(p)); setError(''); setShowForm(true); };
  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setError(''); setShowForm(true); };
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setPrice = (i, key, val) => setForm(f => { const p = [...f.prices]; p[i] = { ...p[i], [key]: val }; return { ...f, prices: p }; });
  const addPrice = () => setForm(f => ({ ...f, prices: [...f.prices, { weight: '', price: '', originalPrice: '' }] }));
  const removePrice = (i) => setForm(f => ({ ...f, prices: f.prices.filter((_, idx) => idx !== i) }));

  const setImage = (i, val) => setForm(f => { const imgs = [...f.images]; imgs[i] = val; return { ...f, images: imgs }; });
  const addImage = () => setForm(f => ({ ...f, images: [...f.images, ''] }));
  const removeImage = (i) => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const handleImageUploaded = (index, imageUrl) => {
    setImage(index, imageUrl);
  };

  const handleImageRemove = (index) => {
    if (form.images.length === 1) {
      setImage(index, ''); // Keep at least one empty slot
    } else {
      removeImage(index);
    }
  };

  const setArr = (key, i, val) => setForm(f => { const a = [...f[key]]; a[i] = val; return { ...f, [key]: a }; });
  const addArr = (key) => setForm(f => ({ ...f, [key]: [...f[key], ''] }));
  const removeArr = (key, i) => setForm(f => ({ ...f, [key]: f[key].filter((_, idx) => idx !== i) }));

  const save = async () => {
    setError(''); setSaving(true);
    const payload = {
      ...form,
      spice: parseInt(form.spice),
      prices: form.prices.filter(p => p.weight).map(p => ({ weight: p.weight, price: parseFloat(p.price), originalPrice: parseFloat(p.originalPrice) })),
      images: form.images.filter(Boolean),
      benefits: form.benefits.filter(Boolean),
      ingredients: form.ingredients.filter(Boolean),
    };
    const url = editing ? `${API}/products/${editing.id}` : `${API}/products`;
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(payload) });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || 'Save failed'); return; }
    setShowForm(false); load();
  };

  const del = async (id) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`${API}/products/${id}`, { method: 'DELETE', headers: authHeader() });
    load();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="dash-actions-bar">
        <button className="dash-btn-primary" onClick={openAdd}><FiPlus /> Add Product</button>
      </div>

      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead><tr><th>Emoji</th><th>Name</th><th>Category</th><th>Tag</th><th>Prices</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.emoji}</td>
                <td>{p.name}</td>
                <td><span className="dash-badge">{p.category}</span></td>
                <td>{p.tag}</td>
                <td style={{ fontSize: 12 }}>
                  {Array.isArray(p.prices) ? p.prices.map(pr => (
                    <div key={pr.weight}>{pr.weight}: <s style={{ color: '#9ca3af' }}>₹{pr.originalPrice}</s> ₹{pr.price}</div>
                  )) : '—'}
                </td>
                <td><span className="dash-badge" style={{ background: p.in_stock ? '#10b98120' : '#ef444420', color: p.in_stock ? '#10b981' : '#ef4444' }}>{p.in_stock ? 'In Stock' : 'Out'}</span></td>
                <td className="dash-actions">
                  <button className="dash-icon-btn edit" onClick={() => openEdit(p)}><FiEdit2 /></button>
                  <button className="dash-icon-btn del" onClick={() => del(p.id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="dash-modal-overlay" onClick={() => setShowForm(false)}>
          <motion.div className="dash-modal dash-modal-lg" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="dash-modal-header">
              <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <div className="dash-modal-body">
              {error && <div className="dash-form-error">{error}</div>}

              <div className="dash-form-section">Basic Info</div>
              <div className="dash-form-row">
                <div className="dash-form-group"><label>Name</label><input value={form.name} onChange={e => set('name', e.target.value)} /></div>
                <div className="dash-form-group"><label>Slug</label><input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. mango-avakaya" /></div>
              </div>
              <div className="dash-form-row">
                <div className="dash-form-group"><label>Emoji</label><input value={form.emoji} onChange={e => set('emoji', e.target.value)} /></div>
                <div className="dash-form-group"><label>Tag</label><input value={form.tag} onChange={e => set('tag', e.target.value)} /></div>
                <div className="dash-form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                    <option value="karam">Karam Podi</option>
                  </select>
                </div>
                <div className="dash-form-group"><label>Spice (1–5)</label><input type="number" min="1" max="5" value={form.spice} onChange={e => set('spice', e.target.value)} /></div>
              </div>
              <div className="dash-form-group"><label>Short Description</label><input value={form.short_desc} onChange={e => set('short_desc', e.target.value)} /></div>
              <div className="dash-form-group"><label>Full Description</label><textarea rows={3} value={form.full_desc || ''} onChange={e => set('full_desc', e.target.value)} /></div>
              <div className="dash-form-group">
                <label className="dash-checkbox-label"><input type="checkbox" checked={form.in_stock} onChange={e => set('in_stock', e.target.checked)} /> In Stock</label>
              </div>

              <div className="dash-form-section">Prices</div>
              {form.prices.map((pr, i) => (
                <div key={i} className="dash-form-row dash-form-price-row">
                  <div className="dash-form-group"><label>Weight</label><input value={pr.weight} onChange={e => setPrice(i, 'weight', e.target.value)} placeholder="250g" /></div>
                  <div className="dash-form-group"><label>Original ₹ <span style={{color:'#9ca3af',fontSize:11}}>strikeoff</span></label><input type="number" value={pr.originalPrice} onChange={e => setPrice(i, 'originalPrice', e.target.value)} /></div>
                  <div className="dash-form-group"><label>Our Price ₹</label><input type="number" value={pr.price} onChange={e => setPrice(i, 'price', e.target.value)} /></div>
                  <button className="dash-icon-btn del" style={{ marginTop: 22 }} onClick={() => removePrice(i)} disabled={form.prices.length === 1}><FiX /></button>
                </div>
              ))}
              <button className="dash-btn-ghost" onClick={addPrice}><FiPlus /> Add Price Variant</button>

              <div className="dash-form-section">Images</div>
              <div className="images-upload-container">
                {form.images.map((img, i) => (
                  <CloudinaryImageUpload
                    key={i}
                    currentImage={img}
                    onImageUploaded={(imageUrl) => handleImageUploaded(i, imageUrl)}
                    onRemove={handleImageRemove}
                    index={i}
                  />
                ))}
              </div>
              <button 
                type="button"
                className="dash-btn-ghost" 
                onClick={addImage}
                style={{ marginTop: '12px' }}
              >
                <FiPlus /> Add Another Image
              </button>

              <div className="dash-form-section">Benefits</div>
              {form.benefits.map((b, i) => (
                <div key={i} className="dash-form-row" style={{ gap: 8 }}>
                  <div className="dash-form-group" style={{ flex: 1 }}><input value={b} onChange={e => setArr('benefits', i, e.target.value)} placeholder="Rich in antioxidants" /></div>
                  <button className="dash-icon-btn del" style={{ marginTop: 4 }} onClick={() => removeArr('benefits', i)} disabled={form.benefits.length === 1}><FiX /></button>
                </div>
              ))}
              <button className="dash-btn-ghost" onClick={() => addArr('benefits')}><FiPlus /> Add Benefit</button>

              <div className="dash-form-section">Ingredients</div>
              {form.ingredients.map((ing, i) => (
                <div key={i} className="dash-form-row" style={{ gap: 8 }}>
                  <div className="dash-form-group" style={{ flex: 1 }}><input value={ing} onChange={e => setArr('ingredients', i, e.target.value)} placeholder="Raw Mango" /></div>
                  <button className="dash-icon-btn del" style={{ marginTop: 4 }} onClick={() => removeArr('ingredients', i)} disabled={form.ingredients.length === 1}><FiX /></button>
                </div>
              ))}
              <button className="dash-btn-ghost" onClick={() => addArr('ingredients')}><FiPlus /> Add Ingredient</button>
            </div>
            <div className="dash-modal-footer">
              <button className="dash-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="dash-btn-primary" onClick={save} disabled={saving}>
                {saving ? 'Saving...' : <><FiCheck /> Save Product</>}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
