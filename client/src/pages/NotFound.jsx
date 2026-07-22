import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiRefreshCw } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <PageTransition>
      <SEOHead
        title="404 - Signal Lost | Techno Drone Robotics"
        description="The page you're looking for has gone off the radar. Return to Techno Drone Robotics homepage."
        path={window.location.pathname}
        noindex
      />

      <main>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-8xl font-bold text-gradient mb-4">404</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative inline-flex items-center justify-center mb-8"
          >
            <div className="w-32 h-32 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-electric/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 border-2 border-dashed border-electric/10 rounded-full"
              />
              <div className="absolute inset-8 flex items-center justify-center">
                <svg viewBox="0 0 64 64" className="w-12 h-12 opacity-50" fill="#1E90FF">
                  <path d="M32 8L16 28h32L32 8z" />
                  <rect x="28" y="28" width="8" height="8" rx="2" />
                  <path d="M8 28h12l4-8H8zM44 28h12l-4-8H40zM8 36h12l4 8H8zM44 36h12l-4 8H40z" />
                  <circle cx="32" cy="44" r="4" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Signal Lost
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-lg mb-2"
          >
            The page you're looking for has gone off the radar.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-sm mb-8 font-mono"
          >
            Error code: ROUTE_404 — Initiating return-to-home protocol...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/" className="btn-primary inline-flex items-center gap-2 justify-center">
              <FiHome /> Return to Base
            </Link>
            <button onClick={() => window.location.reload()} className="btn-outline inline-flex items-center gap-2 justify-center">
              <FiRefreshCw /> Re-establish Connection
            </button>
          </motion.div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
