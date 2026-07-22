import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiSend } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SEOHead from '../components/SEOHead';
import API from '../api';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/slug/${slug}`)
      .then(({ data }) => setProduct(data.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <main className="pt-32 pb-20 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-2xl" />
              <div className="space-y-4"><div className="h-8 bg-gray-200 rounded w-3/4" /><div className="h-4 bg-gray-200 rounded w-1/4" /><div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded w-full" />)}</div></div>
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  if (!product) {
    return (
      <PageTransition>
        <SEOHead title="Product Not Found | Techno Drone Robotics" description="The product you're looking for doesn't exist." noindex />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center"><h1 className="text-3xl font-bold mb-4">Product Not Found</h1><p className="text-gray-600 mb-6">This product may have been removed or the link is broken.</p><Link to="/products" className="btn-primary inline-flex items-center gap-2"><FiArrowLeft /> Back to Products</Link></div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEOHead title={`${product.name} | Techno Drone Robotics`} description={product.description} path={`/products/${product.slug}`} />
      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-electric mb-8 transition-colors"><FiArrowLeft size={16} /> Back to Products</Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gradient-to-br from-blue-50 to-gray-100 relative">
                {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold shadow-sm">{product.category}</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-electric bg-electric/5 border border-electric/10 rounded-full mb-4">{product.category}</span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">{product.name}</h1>
              <p className="text-2xl font-bold text-gradient mb-6">{product.price}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

              {product.features?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600"><FiCheck size={14} className="text-electric shrink-0" />{f}</div>
                    ))}
                  </div>
                </div>
              )}

              {product.specs?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold mb-3">Specifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.specs.map((s) => (
                      <span key={s} className="px-3 py-1.5 text-xs font-mono bg-gray-50 border border-gray-100 rounded-lg text-gray-600">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              <Link to="/contact" className="btn-primary inline-flex items-center gap-2"><FiSend size={16} /> Request a Quote</Link>
            </motion.div>
          </div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
