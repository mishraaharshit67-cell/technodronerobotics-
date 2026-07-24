import { motion } from 'framer-motion';

const modules = import.meta.glob('../assets/partners/*.{png,jpg,jpeg,svg}', { eager: true });
const partnerNames = {
  'partner-4.jpeg': 'Indian Institute of Technology Delhi',
  'partner-5.jpeg': 'Indian Institute of Technology Bombay',
  'partner-6.jpeg': 'National Institute of Technology Trichy',
  'partner-7.jpeg': 'Defence Research and Development Organisation',
  'partner-8.jpeg': 'Indian Space Research Organisation',
  'partner-9.jpeg': 'Bharat Electronics Limited',
  'partner-11.jpeg': 'Indian Institute of Science',
  'partner-13.jpeg': 'Ministry of Education',
  'partner-14.jpeg': 'All India Council for Technical Education',
  'partner-15.jpeg': 'Central Manufacturing Technology Institute',
  'partner-16.jpeg': 'National Skill Development Corporation',
  'partner-17.jpeg': 'Startup India',
  'partner-18.jpeg': 'NASSCOM',
  'partner-19.jpeg': 'Indian Railways',
  'partner-20.jpeg': 'Ministry of Defence',
};

const images = Object.entries(modules).map(([path, m]) => {
  const filename = path.split('/').pop();
  const fallbackName = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').replace(/\bpartner\b/gi, 'Partner').replace(/\s+/g, ' ').trim();
  return {
    src: m.default || m,
    name: partnerNames[filename] || fallbackName,
  };
});

const row1 = images.slice(0, Math.ceil(images.length / 2));
const row2 = images.slice(Math.ceil(images.length / 2));

export default function Partners() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-gray-50/30 to-white">
      <div className="absolute inset-0 bg-grid opacity-[0.015] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-electric/[0.02] to-transparent rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-electric bg-electric/[0.06] border border-electric/[0.12] rounded-full mb-5"
          >
            Trusted Worldwide
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4">
            Our <span className="text-gradient">Partners</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Backed by leading institutions and industry pioneers driving the future of robotics and autonomous systems.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-12 h-0.5 bg-gradient-to-r from-electric to-electric-dark rounded-full mx-auto mt-6"
          />
        </motion.div>
      </div>

      {images.length === 0 ? (
        <div className="text-center text-gray-400 text-sm">Add partner logos to src/assets/partners to display them.</div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="mb-6">
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_2%,black_8%,black_92%,transparent_98%)]">
              <motion.div
                className="flex shrink-0 gap-5 pr-5"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              >
                {[...row1, ...row1].map((img, i) => (
                  <div
                    key={i}
                    className="group relative bg-white rounded-xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-electric/15 transition-all duration-500 flex items-center justify-center shrink-0"
                    style={{ width: 170, height: 88 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-electric/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    <img src={img.src} alt={img.name}
                      className="relative z-10 max-h-9 max-w-28 object-contain transition-all duration-500"
                      style={{ filter: 'brightness(0.85) contrast(0.9)' }}
                      onMouseEnter={(e) => e.target.style.filter = 'brightness(1) contrast(1)'}
                      onMouseLeave={(e) => e.target.style.filter = 'brightness(0.85) contrast(0.9)'} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div>
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_2%,black_8%,black_92%,transparent_98%)]">
              <motion.div
                className="flex shrink-0 gap-5 pr-5"
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              >
                {[...row2, ...row2].map((img, i) => (
                  <div
                    key={i}
                    className="group relative bg-white rounded-xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-electric/15 transition-all duration-500 flex items-center justify-center shrink-0"
                    style={{ width: 170, height: 88 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-electric/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    <img src={img.src} alt={img.name}
                      className="relative z-10 max-h-9 max-w-28 object-contain transition-all duration-500"
                      style={{ filter: 'brightness(0.85) contrast(0.9)' }}
                      onMouseEnter={(e) => e.target.style.filter = 'brightness(1) contrast(1)'}
                      onMouseLeave={(e) => e.target.style.filter = 'brightness(0.85) contrast(0.9)'} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-gray-400 font-medium">And more industry leaders, academic institutions & government agencies</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
