import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';

const categories = ['All', 'Aerial Photography', 'Mapping', 'Inspection', 'Events', 'Behind the Scenes'];

const mediaItems = [
  { type: 'image', category: 'Aerial Photography', title: 'Coastal Survey at Dawn', desc: 'TDR-X1 capturing coastal erosion patterns', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { type: 'image', category: 'Mapping', title: 'Construction Site 3D Model', desc: 'TDR-M2 orthomosaic of a development site', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
  { type: 'image', category: 'Inspection', title: 'Wind Turbine Blade Check', desc: 'Thermal inspection of turbine blades at 80m', image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80' },
  { type: 'image', category: 'Aerial Photography', title: 'City Skyline at Golden Hour', desc: 'Urban aerial cinematography demo', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
  { type: 'image', category: 'Mapping', title: 'Agricultural Field Analysis', desc: 'Multi-spectral NDVI map of crop health', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80' },
  { type: 'image', category: 'Inspection', title: 'Bridge Structural Survey', desc: 'High-res inspection of suspension bridge', image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80' },
  { type: 'image', category: 'Events', title: 'TDR Launch Event 2025', desc: 'Product reveal at our HQ', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { type: 'image', category: 'Behind the Scenes', title: 'R&D Lab Assembly', desc: 'Our engineers assembling TDR-H3 prototypes', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80' },
  { type: 'image', category: 'Aerial Photography', title: 'Mountain Range Transect', desc: 'High-altitude mapping at 4,500m', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80' },
  { type: 'image', category: 'Events', title: 'Industry Conference Demo', desc: 'Live swarm demonstration at AUVSI', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80' },
  { type: 'image', category: 'Inspection', title: 'Power Line Corridor', desc: 'Automated power line inspection flight', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80' },
  { type: 'image', category: 'Behind the Scenes', title: 'Flight Testing Facility', desc: 'Our dedicated drone test range', image: 'https://images.unsplash.com/photo-1621451537084-4820ec9e3e3b?w=600&q=80' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = activeCategory === 'All' ? mediaItems : mediaItems.filter((m) => m.category === activeCategory);
  const currentIndex = selected ? filtered.findIndex((m) => m.title === selected.title) : -1;

  const goNext = useCallback(() => {
    if (currentIndex < filtered.length - 1) setSelected(filtered[currentIndex + 1]);
  }, [currentIndex, filtered]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setSelected(filtered[currentIndex - 1]);
  }, [currentIndex, filtered]);

  useEffect(() => {
    if (!selected) return;
    const handler = (e) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, goNext, goPrev]);

  let touchStartX = 0;
  const handleTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) diff > 0 ? goPrev() : goNext();
  };

  return (
    <PageTransition>
      <SEOHead title="Gallery | Techno Drone Robotics" description="Browse our gallery of drone photography, aerial mapping, inspection projects, and behind-the-scenes footage." path="/gallery" />
      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle as="h1" title="Gallery" subtitle="See our drones in action — from aerial cinematography to critical infrastructure inspection." />

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-electric to-electric-dark text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>{cat}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <motion.div key={item.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.02 }}
                  className="group cursor-pointer relative aspect-[4/3] rounded-xl overflow-hidden border border-electric/10 hover:border-electric/30 transition-all"
                  onClick={() => setSelected(item)}>
                  <LazyImage src={item.image} alt={item.title} className="w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-gray-300">{item.desc}</p>
                    <span className="text-[10px] text-electric font-mono mt-1">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500"><p className="text-lg">No media in this category yet.</p></div>
          )}

          <AnimatePresence>
            {selected && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                onClick={() => setSelected(null)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><FiX size={20} className="text-white" /></button>

                {currentIndex > 0 && (
                  <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><FiChevronLeft size={24} className="text-white" /></button>
                )}
                {currentIndex < filtered.length - 1 && (
                  <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><FiChevronRight size={24} className="text-white" /></button>
                )}

                <motion.div key={selected.title} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900">
                    <img src={selected.image?.replace('w=600', 'w=1200')} alt={selected.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold text-white">{selected.title}</h3>
                    <p className="text-gray-400 mt-1">{selected.desc}</p>
                    <span className="text-xs text-electric font-mono mt-2 inline-block">{selected.category}</span>
                    <p className="text-xs text-gray-500 mt-2">{currentIndex + 1} / {filtered.length}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
