import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import API from '../../api';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get('/contact').then(({ data }) => setContacts(data.data || [])).catch(() => setContacts([])).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Contact Submissions">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No submissions yet.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {contacts.map((c) => (
              <div key={c._id} className="px-6 py-4">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold text-navy">{c.name}</p>
                  <span className="text-[10px] text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{c.email} · {c.phone || 'No phone'}</p>
                <p className="text-sm text-gray-700">{c.message}</p>
                {c.service && <span className="inline-block mt-2 px-2 py-0.5 text-[10px] bg-electric/10 text-electric/80 rounded-full">{c.service}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
