import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiFileText, FiBriefcase, FiMail, FiUsers, FiLogOut } from 'react-icons/fi';
import SEOHead from '../../components/SEOHead';
import API from '../../api';

const nav = [
  { path: '/admin', label: 'Dashboard', icon: FiPackage, exact: true },
  { path: '/admin/products', label: 'Products', icon: FiPackage },
  { path: '/admin/blog', label: 'Blog Posts', icon: FiFileText },
  { path: '/admin/jobs', label: 'Jobs', icon: FiBriefcase },
  { path: '/admin/contacts', label: 'Contacts', icon: FiMail },
  { path: '/admin/newsletter', label: 'Newsletter', icon: FiUsers },
];

export default function AdminLayout({ children, title }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tdr_admin');
    const token = localStorage.getItem('tdr_token');
    if (!token || !stored) { navigate('/admin/login'); return; }
    setAdmin(JSON.parse(stored));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('tdr_token');
    localStorage.removeItem('tdr_admin');
    navigate('/admin/login');
  };

  const isActive = (item) => {
    if (item.exact) return window.location.pathname === item.path;
    return window.location.pathname.startsWith(item.path);
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SEOHead title={`${title} | Admin | Techno Drone Robotics`} path="/admin" noindex />
      <aside className={`bg-navy text-white transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-56'} shrink-0`}>
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <img src="/company-logo.jpeg" alt="TDR" className="h-8 w-8 rounded shrink-0" />
          {!collapsed && <span className="text-sm font-bold truncate">TDR Admin</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-white/50 hover:text-white text-xs">{collapsed ? '>' : '<'}</button>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(item) ? 'bg-electric/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}>
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 w-full transition-colors">
            <FiLogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-navy mb-6">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
