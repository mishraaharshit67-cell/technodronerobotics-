import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const labels = {
  '/': 'Home',
  '/about': 'About',
  '/products': 'Products',
  '/services': 'Services',
  '/technology': 'Technology',
  '/gallery': 'Gallery',
  '/blog': 'Blog',
  '/contact': 'Contact',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  if (parts.length === 0 || location.pathname.startsWith('/admin')) return null;

  const crumbs = parts.map((part, i) => {
    const path = '/' + parts.slice(0, i + 1).join('/');
    return { label: labels[path] || part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), path, isLast: i === parts.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <ol className="flex items-center gap-1.5 text-xs text-gray-500">
        <li><Link to="/" className="hover:text-electric transition-colors">Home</Link></li>
        {crumbs.map((crumb) => (
          <li key={crumb.path} className="flex items-center gap-1.5">
            <FiChevronRight size={10} />
            {crumb.isLast ? (
              <span className="text-gray-800 font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-electric transition-colors">{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
