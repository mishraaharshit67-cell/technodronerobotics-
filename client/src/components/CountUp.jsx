import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

export default function CountUp({ end, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 80 });
  const displayValue = useRef(0);

  useEffect(() => {
    if (!inView) return;
    let startTime;
    let raf;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayValue.current = Math.floor(eased * end);
      motionValue.set(displayValue.current);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, motionValue]);

  return (
    <span ref={ref}>
      <motion.span>{springValue}</motion.span>{suffix}
    </span>
  );
}
