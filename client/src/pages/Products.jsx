import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import { fetchProducts } from '../api';

const categories = ['All', 'FPV Drone', 'Agricultural', 'Fire Fighting', 'Kamikaze', 'Customization'];

const PAGE_SIZE = 8;

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    setVisible(PAGE_SIZE);
    fetchProducts(activeCategory)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [search]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(0, visible);

  return (
    <PageTransition>
      <SEOHead
        title="Products | Techno Drone Robotics"
        description="Explore our range of drones - FPV, agricultural, fire fighting, kamikaze, and fully customizable UAVs for any mission."
        path="/products"
      />

      <main>
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle as="h1" title="Our Products" subtitle="Professional-grade UAVs engineered for mission-critical operations across every industry." />

          <div className="flex flex-col gap-4 mb-8 sm:mb-10">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-electric/20 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:border-electric/50" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-electric to-electric-dark text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-navy'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2.5 h-2.5 bg-electric rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginated.map((product, i) => (
                  <motion.div key={product._id || product.name} layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link to={`/products/${product.slug}`} className="card flex flex-col group h-full min-w-0">
                    <div className="aspect-[4/3] rounded-lg mb-4 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                      {product.image && (
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity"
                          loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-semibold text-navy shadow-sm">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-electric transition-colors break-words">{product.name}</h3>
                      <span className="text-xs font-mono text-gradient shrink-0">{product.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 flex-1 line-clamp-3">{product.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(product.specs || []).map((s) => (
                        <span key={s} className="px-2 py-0.5 text-[10px] font-mono bg-electric/10 text-electric/80 rounded">{s}</span>
                      ))}
                    </div>
                    <span className="text-xs text-electric font-semibold mt-auto group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">View Details →</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && paginated.length < filtered.length && (
            <div className="text-center mt-8">
              <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline inline-flex items-center gap-2 text-sm">Load More ({filtered.length - paginated.length} remaining)</button>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-600">
              <p className="text-lg">No products match your filters.</p>
              <button onClick={() => { setActiveCategory('All'); setSearch(''); }} className="text-electric hover:underline mt-2">Clear filters</button>
            </div>
          )}
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
