import { useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import API from '../../api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('tdr_token', data.token);
      localStorage.setItem('tdr_admin', JSON.stringify(data.admin));
      window.location.href = '/admin';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <SEOHead title="Admin Login | Techno Drone Robotics" path="/admin/login" noindex />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/company-logo.jpeg" alt="TDR" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Techno Drone Robotics</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-xl">
          {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-electric/40" placeholder="admin@tdr.com" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-electric/40" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-colors disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
