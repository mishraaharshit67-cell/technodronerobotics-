import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  'from-electric/5 via-blue-300/5 to-transparent',
  'from-blue-400/5 via-cyan-300/5 to-transparent',
  'from-electric/8 via-blue-200/5 to-transparent',
];

export default function AnimatedOrbs({ count = 3, className = '' }) {
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    setOrbs(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 200 + Math.random() * 300,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 6,
        xDrift: (Math.random() - 0.5) * 30,
        yDrift: (Math.random() - 0.5) * 30,
      }))
    );
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute bg-gradient-to-br rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle at center, rgba(30,144,255,0.06) 0%, rgba(0,191,255,0.03) 40%, transparent 70%)`,
          }}
          animate={{
            x: [0, orb.xDrift, -orb.xDrift * 0.5, orb.xDrift * 0.7, 0],
            y: [0, -orb.yDrift, orb.yDrift * 0.5, -orb.yDrift * 0.3, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
