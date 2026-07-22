import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import API from '../../api';

export default function AdminNewsletter() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get('/newsletter').then(({ data }) => setSubs(data.data || [])).catch(() => setSubs([])).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Newsletter Subscribers">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
        ) : subs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No subscribers yet.</div>
        ) : (
          <>
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
              Total: <strong>{subs.length}</strong> subscribers
            </div>
            <div className="divide-y divide-gray-50">
              {subs.map((s) => (
                <div key={s._id} className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{s.email}</span>
                  <span className="text-[10px] text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
