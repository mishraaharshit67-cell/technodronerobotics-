import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';

const mediaItems = [
  { type: 'image', title: 'New Gallery Shot 1', desc: 'Recently added showcase from our latest project', image: '/gallery/gallery-1.jpeg' },
  { type: 'image', title: 'New Gallery Shot 2', desc: 'Behind-the-scenes look at our team in action', image: '/gallery/gallery-2.jpeg' },
  { type: 'image', title: 'New Gallery Shot 3', desc: 'A fresh addition to the gallery collection', image: '/gallery/gallery-3.jpeg' },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  const filtered = mediaItems;
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

          <AnimatePresence mode="wait">
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <motion.div key={item.title} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => setSelected(item)}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <LazyImage src={item.image} alt={item.title} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="text-xs text-gray-200">{item.desc}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
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

                <motion.div key={selected.title} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                  className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                  <div className="rounded-3xl overflow-hidden border border-white/10 bg-gray-950 shadow-2xl">
                    <img src={selected.image?.replace('w=600', 'w=1400')} alt={selected.title} className="w-full max-h-[75vh] object-contain bg-gray-950" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold text-white">{selected.title}</h3>
                    <p className="text-gray-400 mt-1">{selected.desc}</p>
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
