import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { path: '/#home', label: 'Home', anchor: true },
  { path: '/#about', label: 'About', anchor: true },
  { path: '/#solutions', label: 'Solutions', anchor: true },
  { path: '/#drones', label: 'Drones', anchor: true },
  { path: '/#technoh', label: 'Techno-H', anchor: true },
  { path: '/#contact', label: 'Contact', anchor: true },
];

const secondaryLinks = [
  { path: '/gallery', label: 'Gallery' },
  { path: '/blog', label: 'Blog' },
  { path: '/careers', label: 'Careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { dark, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') { setActiveSection(''); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleNavClick = (e, path, anchor) => {
    if (!anchor) return;
    e.preventDefault();
    const hash = path.split('#')[1];
    if (location.pathname !== '/') {
      window.location.href = path;
      return;
    }
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (path, anchor) => {
    if (!anchor) return location.pathname === path;
    return activeSection === path.split('#')[1];
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img src="/company-logo.jpeg" alt="Techno Drone Robotics" className="h-9 lg:h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-navy leading-tight">TECHNO</div>
              <div className="text-[9px] font-semibold text-electric tracking-wider leading-tight">DRONE ROBOTICS</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path, link.anchor)}
                className={`relative px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path, link.anchor)
                    ? 'text-electric'
                    : 'text-gray-500 hover:text-navy'
                }`}
              >
                {link.label}
                {isActive(link.path, link.anchor) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-electric/5 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <div className="ml-3 pl-3 border-l border-gray-200 flex items-center gap-0.5">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hover:text-electric transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button onClick={toggle} aria-label="Toggle dark mode"
              className="ml-2 p-2 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-100 transition-all">
              {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact', true)}
              className="ml-2 px-5 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-light transition-all duration-300 hover:shadow-lg hover:shadow-navy/20"
            >
              Get a Quote
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden relative z-50 p-2 rounded-lg transition-colors ${
              mobileOpen ? 'text-white' : 'text-navy hover:bg-gray-100'
            }`}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-40 lg:hidden shadow-2xl"
            >
              <div className="flex items-center h-16 px-4 border-b border-gray-100">
                <img src="/company-logo.jpeg" alt="Techno Drone Robotics" className="h-8" />
              </div>
              <div className="p-4 space-y-0.5 overflow-y-auto max-h-[calc(100vh-4rem)]">
                {navLinks.map((link) => (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, link.anchor)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive(link.path, link.anchor)
                        ? 'text-electric bg-electric/5'
                        : 'text-gray-600 hover:text-navy hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      isActive(link.path, link.anchor) ? 'bg-electric' : 'bg-gray-300'
                    }`} />
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">More</p>
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-electric hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link to="/team" className="block px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-electric hover:bg-gray-50 rounded-lg transition-colors">
                    Team
                  </Link>
                  <button onClick={toggle} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-navy hover:bg-gray-50 rounded-lg transition-colors mt-1">
                    {dark ? <FiSun size={16} /> : <FiMoon size={16} />} {dark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
                <div className="pt-4 mt-2">
                  <a
                    href="/#contact"
                    onClick={(e) => handleNavClick(e, '/#contact', true)}
                    className="block w-full px-5 py-3 bg-navy text-white text-sm font-semibold rounded-lg text-center hover:bg-navy-light transition-colors"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
