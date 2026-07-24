import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';
import { useState } from 'react';
import { subscribeNewsletter } from '../api';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Solutions', path: '/#solutions' },
  { label: 'Drones', path: '/#drones' },
  { label: 'Technology', path: '/technology' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/#contact' },
  { label: 'Team', path: '/team' },
  { label: 'Blog', path: '/blog' },
  { label: 'Careers', path: '/careers' },
];

const socialLinks = [
  { icon: FaLinkedinIn, href: 'https://linkedin.com/company/technodrone', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/technodrone', label: 'Twitter' },
  { icon: FaGithub, href: 'https://github.com/technodrone', label: 'GitHub' },
  { icon: FaYoutube, href: 'https://youtube.com/@technodrone', label: 'YouTube' },
];

export default function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribing(true);
    setFeedback({ type: '', message: '' });
    try {
      await subscribeNewsletter(email);
      setFeedback({ type: 'success', message: 'Thanks for subscribing!' });
      setEmail('');
    } catch {
      setFeedback({ type: 'error', message: 'Please try again later.' });
      setEmail('');
    }
    setSubscribing(false);
  };

  return (
    <footer className="relative border-t border-electric/10 bg-light-gray">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src="/company-logo.jpeg" alt="Techno Drone Robotics" className="h-12 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Pioneering the future of autonomous drone technology. From aerial mapping to AI-powered robotics, we build solutions that soar.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-electric/10 hover:text-electric transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const isAnchor = link.path.includes('#');
                const handleClick = isAnchor ? (e) => {
                  e.preventDefault();
                  if (location.pathname !== '/') { window.location.href = link.path; return; }
                  const el = document.getElementById(link.path.split('#')[1]);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } : undefined;
                return (
                  <li key={link.label}>
                    {isAnchor ? (
                      <a href={link.path} onClick={handleClick} className="text-gray-500 hover:text-electric text-sm transition-colors">{link.label}</a>
                    ) : (
                      <Link to={link.path} className="text-gray-500 hover:text-electric text-sm transition-colors">{link.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-widest mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 text-sm">
                <FiMapPin className="mt-0.5 text-electric shrink-0" />
                <span>123 Innovation Drive, Tech Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <FiPhone className="text-electric shrink-0" />
                <a href="tel:+918989846072" className="hover:text-electric transition-colors">+91 8989846072 / 8989560802</a>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <FiMail className="text-electric shrink-0" />
                <a href="mailto:technodroneroboticspvt.ltd@gmail.com" className="hover:text-electric transition-colors">technodroneroboticspvt.ltd@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-widest mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Stay updated with the latest in drone technology and company news.</p>
            {feedback.type === 'success' ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-cyan text-sm">
                {feedback.message}
              </motion.div>
            ) : (
              <>
                {feedback.type === 'error' && (
                  <p className="mb-3 text-sm text-red-600">{feedback.message}</p>
                )}
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email" required disabled={subscribing}
                    className="flex-1 px-3 py-2 bg-white border border-electric/20 rounded-lg text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-electric/50 transition-colors" />
                  <button type="submit" disabled={subscribing} aria-label="Subscribe to newsletter"
                    className="p-2 bg-gradient-to-r from-electric to-electric-dark rounded-lg hover:shadow-lg hover:shadow-electric/30 transition-all disabled:opacity-60">
                    <FiSend size={18} />
                  </button>
                </form>
              </>
            )}
            <p className="text-[10px] text-gray-400 mt-2">
              <a href="/api/newsletter/unsubscribe" className="hover:text-electric transition-colors" target="_blank" rel="noopener noreferrer">Unsubscribe</a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-electric/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Techno Drone Robotics. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="/privacy-policy" className="hover:text-electric transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-electric transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
