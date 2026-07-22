import { motion } from 'framer-motion';

const motionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 };

export default function SectionTitle({ title, subtitle, light = false, as = 'h2' }) {
  const Tag = motionTags[as] || motion.h2;
  return (
    <div className="text-center mb-12 md:mb-16">
      <Tag
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold ${light ? 'text-white' : ''}`}
      >
        <span className="text-gradient">{title}</span>
      </Tag>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-4"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        className="w-20 h-1 bg-gradient-to-r from-electric to-electric-dark rounded-full mx-auto mt-6"
      />
    </div>
  );
}
