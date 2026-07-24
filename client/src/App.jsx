import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Preloader from './components/Preloader';
import BackToTop from './components/BackToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import Breadcrumbs from './components/Breadcrumbs';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Services = lazy(() => import('./pages/Services'));
const Technology = lazy(() => import('./pages/Technology'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminBlog = lazy(() => import('./pages/admin/Blog'));
const AdminJobs = lazy(() => import('./pages/admin/Jobs'));
const AdminContacts = lazy(() => import('./pages/admin/Contacts'));
const AdminNewsletter = lazy(() => import('./pages/admin/Newsletter'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <ScrollProgressBar />
      <Navbar />
      <Breadcrumbs />
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-navy">
            <div className="flex flex-col items-center gap-4">
              <img src="/company-logo.jpeg" alt="Techno Drone Robotics" className="h-12 animate-pulse" />
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>}>
            {children}
          </Suspense>
        </AnimatePresence>
      </ErrorBoundary>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <ToastProvider>
      <Preloader />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`${loading ? 'hidden' : 'block'}`}>
        {isAdmin ? (
          <Routes location={location}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/newsletter" element={<AdminNewsletter />} />
          </Routes>
        ) : (
          <MainLayout>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/terms-of-service" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        )}
      </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
