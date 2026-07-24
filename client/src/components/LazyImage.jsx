import { useState, useRef, useEffect } from 'react';

export default function LazyImage({ src, alt, className = '', ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { rootMargin: '200px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      {inView && <img src={src} alt={alt} className={`w-full h-full object-cover object-center transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setLoaded(true)} />}
      {(!loaded || !inView) && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
    </div>
  );
}
