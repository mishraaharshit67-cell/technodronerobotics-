import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import API from '../../api';

export default function AdminDataManager({ title, endpoint, fields, defaultItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultItem);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get(`/${endpoint}`)
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await API.put(`/${endpoint}/${editing}`, form);
      } else {
        await API.post(`/${endpoint}`, form);
      }
      setForm(defaultItem);
      setEditing(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await API.delete(`/${endpoint}/${id}`);
      load();
    } catch { alert('Delete failed'); }
  };

  const startEdit = (item) => {
    setForm(item);
    setEditing(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(defaultItem);
    setEditing(null);
  };

  return (
    <AdminLayout title={title}>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
        <h3 className="text-sm font-semibold text-navy mb-4">{editing ? 'Edit' : 'Add New'}</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {fields.filter((f) => f.type !== 'textarea').map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
              {f.type === 'select' ? (
                <select name={f.name} value={form[f.name] || ''} onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-electric/40">
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.type || 'text'} name={f.name} value={form[f.name] || ''} onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-electric/40" />
              )}
            </div>
          ))}
        </div>
        {fields.filter((f) => f.type === 'textarea').map((f) => (
          <div key={f.name} className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
            <textarea name={f.name} value={form[f.name] || ''} onChange={handleChange} rows={4}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-electric/40" />
          </div>
        ))}
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="px-5 py-2 bg-navy text-white rounded-lg text-sm font-semibold hover:bg-navy-light transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
          </button>
          {editing && <button type="button" onClick={cancelEdit} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">Cancel</button>}
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No items yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {fields.filter((f) => !f.hide).map((f) => (
                    <th key={f.name} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{f.label}</th>
                  ))}
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    {fields.filter((f) => !f.hide).map((f) => (
                      <td key={f.name} className="px-4 py-3 text-gray-700">
                        {f.render ? f.render(item) : (item[f.name] || '—')}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => startEdit(item)} className="text-electric hover:underline text-xs mr-3">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:underline text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
