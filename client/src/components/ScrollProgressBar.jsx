import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left bg-gradient-to-r from-electric via-electric-light to-electric-dark"
      style={{ scaleX }}
    />
  );
}
