import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING SYSTEMS...');

  const statusMessages = [
    { at: 20, msg: 'CALIBRATING SENSORS...' },
    { at: 40, msg: 'LOADING FLIGHT CONTROLS...' },
    { at: 60, msg: 'ESTABLISHING CONNECTION...' },
    { at: 80, msg: 'READY FOR LAUNCH...' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 5 + 1, 100);
        const statusUpdate = statusMessages.find((s) => next >= s.at);
        if (statusUpdate) setStatus(statusUpdate.msg);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(30,144,255,0.12),_transparent_55%),_linear-gradient(135deg,_#f8fbff,_#eef6ff)] px-4"
      >
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 border-2 border-electric/20 rounded-full flex items-center justify-center"
          >
            <div className="w-16 h-16 border-2 border-electric/10 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8"
              >
                <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
                  <path d="M32 8L16 28h32L32 8z" fill="#1E90FF" />
                  <rect x="28" y="28" width="8" height="8" rx="2" fill="#0099CC" />
                  <path d="M8 28h12l4-8H8zM44 28h12l-4-8H40zM8 36h12l4 8H8zM44 36h12l-4 8H40z" fill="#1E90FF" opacity="0.7" />
                  <circle cx="32" cy="44" r="4" fill="#60A5FA" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ['0 0 20px rgba(37,99,235,0.2)', '0 0 40px rgba(37,99,235,0.4)', '0 0 20px rgba(37,99,235,0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="w-full max-w-xs sm:max-w-sm mb-4">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric to-electric-dark rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-electric/70 text-center">{status}</div>
        <div className="font-mono text-xs text-gray-600 mt-2">{Math.round(progress)}%</div>
      </motion.div>
    </AnimatePresence>
  );
}
