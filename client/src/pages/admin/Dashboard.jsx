import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';
import API from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/products').catch(() => ({ data: { count: 0 } })),
      API.get('/blog', { params: { limit: 5 } }).catch(() => ({ data: { count: 0, data: [] } })),
      API.get('/jobs').catch(() => ({ data: { count: 0 } })),
    ]).then(([products, blog, jobs]) => {
      setStats({
        products: products.data.count || products.data.data?.length || 0,
        blog: blog.data.count || blog.data.data?.length || 0,
        jobs: jobs.data.count || jobs.data.data?.length || 0,
      });
      setRecent((blog.data.data || []).slice(0, 5));
    });
  }, []);

  const cards = [
    { label: 'Products', value: stats?.products ?? '...', color: 'from-blue-500 to-blue-600', link: '/admin/products' },
    { label: 'Blog Posts', value: stats?.blog ?? '...', color: 'from-purple-500 to-purple-600', link: '/admin/blog' },
    { label: 'Jobs', value: stats?.jobs ?? '...', color: 'from-emerald-500 to-emerald-600', link: '/admin/jobs' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <a key={card.label} href={card.link}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
              <span className="text-white font-bold text-lg">{card.value}</span>
            </div>
            <p className="text-sm font-semibold text-navy group-hover:text-electric transition-colors">{card.label}</p>
          </a>
        ))}
      </div>

      {recent.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-navy">Recent Blog Posts</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recent.map((post) => (
              <div key={post._id} className="px-6 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-navy">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.author} · {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] rounded-full ${post.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
