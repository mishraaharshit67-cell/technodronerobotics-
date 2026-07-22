import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('tdr_cookies');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('tdr_cookies', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto lg:mx-0 lg:left-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xl backdrop-blur-xl">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-navy">🍪 Cookies</p>
              <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600"><FiX size={16} /></button>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
            </p>
            <div className="flex gap-2">
              <button onClick={accept} className="flex-1 px-4 py-2 bg-navy text-white rounded-lg text-xs font-semibold hover:bg-navy-light transition-colors">Accept All</button>
              <button onClick={() => setVisible(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors">Decline</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
