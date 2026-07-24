import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FiArrowRight, FiCheck, FiCpu, FiCamera, FiMap, FiShield, FiTarget,
  FiTool, FiBookOpen, FiMonitor, FiLayers, FiPrinter,
  FiWind, FiHeart, FiSearch, FiSend, FiEye, FiMic, FiWifi, FiBattery,
  FiNavigation, FiCoffee
} from 'react-icons/fi';
import AnimatedOrbs from '../components/AnimatedOrbs';
import CountUp from '../components/CountUp';
import TiltCard from '../components/TiltCard';
import WaveDivider from '../components/WaveDivider';
import Partners from '../components/Partners';
import FAQ from '../components/FAQ';
import SEOHead from '../components/SEOHead';
import { fetchProducts, submitContact } from '../api';

const stats = [
  { label: 'Drones Deployed', value: 3200, suffix: '+' },
  { label: 'Flight Hours', value: 65000, suffix: '+' },
  { label: 'Clients Served', value: 780, suffix: '+' },
  { label: 'Patents Pending', value: 18, suffix: '' },
];

const solutions = [
  { icon: FiTarget, title: 'Drone Pilot Training', desc: 'DGCA-certified training with flight simulators and practical flying for professional pilots.', features: ['DGCA Certified', 'Flight Simulator', 'Practical Flying'] },
  { icon: FiBookOpen, title: 'Robotics & STEM Kits', desc: 'DIY drone and robotics kits for hands-on learning in AI, IoT, programming and electronics.', features: ['DIY Kits', 'AI & IoT', 'Programming'] },
  { icon: FiMonitor, title: 'Drone Colour Shows', desc: 'Choreographed LED drone light shows with custom formations for events and celebrations.', features: ['LED Choreography', 'Custom Formations', 'Night Shows'] },
  { icon: FiLayers, title: 'Lab Setup', desc: 'Turnkey drone & robotics laboratories for schools, colleges, and research institutions.', features: ['Lab Planning', 'Equipment Supply', 'Faculty Training'] },
  { icon: FiWind, title: 'Aerial Services', desc: 'Aerial mapping, inspection, surveillance, and precision flower dropping services.', features: ['Aerial Mapping', 'Inspection', 'Precision Ops'] },
  { icon: FiPrinter, title: '3D Printing & Design', desc: 'Professional CAD modelling and 3D printing for drone parts, prototypes, and custom enclosures.', features: ['CAD Modelling', 'FDM/SLA', 'Rapid Prototyping'] },
  { icon: FiCpu, title: 'R&D Partnerships', desc: 'Collaborative research in autonomous flight, computer vision, swarm intelligence, and delivery systems.', features: ['AI Research', 'Swarm Tech', 'Sensor Fusion'] },
  { icon: FiShield, title: 'RPTO Assistance', desc: 'End-to-end DGCA compliance support for establishing Remote Pilot Training Organisations.', features: ['DGCA Compliance', 'Documentation', 'Setup Support'] },
];

const products = [
  { name: 'TDR-FPV Series', desc: 'High-speed FPV racing and exploration drones with HD digital transmission.', specs: '120km/h · HD FPV · 8km range', color: '#1E90FF', image: 'https://images.unsplash.com/photo-1774553988130-ccda57774818?w=400&q=80' },
  { name: 'TDR-Agri Series', desc: 'Precision agriculture drones with multi-spectral imaging and automated spraying.', specs: '30L tank · RTK GPS · NDVI', color: '#0099CC', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80' },
  { name: 'TDR-Fire Series', desc: 'Thermal imaging and retardant deployment drones for firefighting operations.', specs: 'Thermal 640×512 · 20L · Night ops', color: '#FF6F00', image: 'https://images.unsplash.com/photo-1506942596041-5f7d17c1bc2b?w=400&q=80' },
  { name: 'TDR-Kamikaze Series', desc: 'Loitering munition drones with autonomous target acquisition and swarm capability.', specs: 'AI targeting · Mesh net · 50km', color: '#D50000', image: 'https://images.unsplash.com/photo-1514043370531-a00dbd95c42e?w=400&q=80' },
  { name: 'Custom Builds', desc: 'Fully bespoke drone platforms tailored to your exact mission requirements.', specs: 'Bespoke airframe · Payload · Avionics', color: '#9C27B0', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80' },
];

const contactInfo = [
  { icon: FiMap, label: 'Address', value: 'Ayodhaya Nagar, Bhopal-462041' },
  { icon: FiTarget, label: 'Email', value: 'technodroneroboticspvt.ltd@gmail.com' },
  { icon: FiTool, label: 'Phone', value: '+91 8989846072 / 8989560802' },
];

function SectionHeading({ title, subtitle, light }) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold ${light ? 'text-white' : ''}`}>
        {title} <span className="text-gradient">{subtitle}</span>
      </motion.h2>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        className="w-16 h-1 bg-gradient-to-r from-electric to-electric-dark rounded-full mx-auto mt-6" />
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [apiProducts, setApiProducts] = useState([]);
  const targetRef = useRef();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  useEffect(() => {
    fetchProducts().then(setApiProducts).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    if (submitError) setSubmitError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Invalid email format';
    if (!form.message.trim()) errors.message = 'Message is required';
    if (Object.keys(errors).length) { setFormErrors(errors); return; }
    setFormErrors({});
    setSending(true);
    setSubmitError('');
    try { await submitContact(form); } catch { setSubmitError('Failed to send. Please try again later.'); setSending(false); return; }
    setSubmitted(true);
    setSending(false);
  };

  return (
    <>
      <SEOHead
        title="Techno Drone Robotics | Cutting-Edge Drone Technology"
        description="Techno Drone Robotics - Pioneering autonomous drone technology for aerial mapping, inspection, surveillance, and industrial applications."
      />

      <main>
      {/* ============ HERO ============ */}
      <section id="home" ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline preload="metadata"
            className="w-full h-full object-cover opacity-70"
            poster="/company-logo.jpeg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}>
            <source src="/hero-bg.mp4" type="video/mp4" />
            <source src="/hero-bg.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(102,178,255,0.2),_transparent_50%)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <AnimatedOrbs count={3} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
            <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-wider text-electric-light bg-white/5 border border-white/10 rounded-full">
              FPV · AGRICULTURAL · FIRE FIGHTING · KAMIKAZE · CUSTOM
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight text-white px-2 sm:px-0">
            The Future of <span className="text-gradient">Flight</span> is Autonomous
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-electric-light/80 text-sm sm:text-base md:text-lg font-medium tracking-wide mb-3">
            Engineering what flies, and what works beside you.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-blue-100/70 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 px-2 sm:px-0">
            From FPV racers and agricultural sprayers to firefighting drones and loitering munitions — we engineer mission-specific UAVs for any domain.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center px-2 sm:px-0">
            <a href="/#drones" className="btn-primary text-lg inline-flex items-center gap-2 justify-center shadow-lg shadow-electric/25">
              Explore Products <FiArrowRight />
            </a>
            <a href="/#contact" className="px-8 py-3 border border-white/20 rounded-lg font-semibold text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 justify-center">
              Get in Touch
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-blue-200/60 mt-1.5 tracking-widest uppercase font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <WaveDivider />

      {/* ============ ABOUT ============ */}
      <section id="about" className="py-24 md:py-32 relative bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} className="lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-navy">
                About <span className="text-gradient">Techno Drone Robotics</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                An innovative Indian technology company specializing in the design, development, manufacturing, and deployment of advanced Unmanned Aerial Systems (UAS), intelligent robotic solutions, and STEM education technologies.
              </p>
              <p className="text-gray-500 leading-relaxed mb-5">
                From FPV racers and agricultural sprayers to firefighting drones and loitering munitions, our product portfolio spans every mission domain. We also provide DIY STEM kits, turnkey lab setup, RPTO assistance, professional training, and R&D partnerships.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Driven by innovation, precision engineering, and indigenous manufacturing — we bridge the gap between cutting-edge technology and practical real-world applications.
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-electric/25">
                Learn More <FiArrowRight />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <FiEye className="text-electric mb-3" size={24} />
                <h3 className="text-base font-semibold mb-2 text-navy">Our Vision</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Global leader in advanced manufacturing, robotics, and drone technology with indigenous, cutting-edge solutions.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <FiTarget className="text-electric mb-3" size={24} />
                <h3 className="text-base font-semibold mb-2 text-navy">Our Mission</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Empower institutions, industries, and technologists with high-quality products, training, and technology solutions.</p>
              </div>
              <div className="bg-gradient-to-br from-electric/5 to-blue-50 rounded-2xl p-6 border border-electric/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: 3200, label: 'Drones Built' },
                    { value: 65000, label: 'Flight Hours' },
                    { value: 780, label: 'Clients' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-bold text-gradient"><CountUp end={s.value} suffix="+" /></div>
                      <div className="text-[10px] text-gray-500 mt-1 font-mono tracking-wide uppercase">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* ============ SOLUTIONS ============ */}
      <section id="solutions" className="py-24 md:py-32 relative overflow-hidden">
        <AnimatedOrbs count={2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What" subtitle="We Do" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <TiltCard tiltDegree={6}>
                  <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-electric/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/10 to-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-electric/20 group-hover:to-blue-100 transition-all duration-300">
                      <sol.icon className="text-electric" size={22} />
                    </div>
                    <h3 className="text-base font-semibold mb-2 text-navy">{sol.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{sol.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sol.features.map((f) => (
                        <span key={f} className="px-2.5 py-0.5 text-[10px] font-medium bg-gray-50 text-gray-500 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-electric hover:text-electric-dark transition-colors">
              View All Services <FiArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <WaveDivider />

      {/* ============ DRONES ============ */}
      <section id="drones" className="py-24 md:py-32 relative bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our" subtitle="Drones" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6 }}
              >
                <TiltCard tiltDegree={10}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center overflow-hidden relative">
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover absolute inset-0 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 64 64" className="w-8 h-8 opacity-60" fill={product.color}>
                      <path d="M32 8L16 28h32L32 8z" />
                      <rect x="28" y="28" width="8" height="8" rx="2" />
                      <path d="M8 28h12l4-8H8zM44 28h12l-4-8H40zM8 36h12l4 8H8zM44 36h12l-4 8H40z" />
                      <circle cx="32" cy="44" r="4" />
                    </svg>
                  </div>
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-semibold text-navy shadow-sm">
                    {product.name}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{product.desc}</p>
                  <div className="text-[10px] text-electric font-mono tracking-tight">{product.specs}</div>
                </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-electric/25">
              View All Products <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <WaveDivider />

      {/* ============ PARTNERS ============ */}
      <section id="partners">
        <Partners />
      </section>


      {/* ============ TECHNO-H ROBOT ============ */}
      <section id="technoh" className="py-24 md:py-32 relative bg-gradient-to-b from-gray-50/60 to-white overflow-hidden">
        <AnimatedOrbs count={2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}>
              <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-electric bg-electric/5 border border-electric/10 rounded-full mb-4">Featured Product</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4">
                Techno-H <span className="text-gradient">Robot</span>
              </h2>
              <p className="text-lg text-gray-500 font-medium">AI-Powered Service & Educational Robot</p>
              <p className="text-gray-400 text-sm mt-1">Intelligent. Reliable. Always on Duty.</p>
            </motion.div>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              className="w-16 h-1 bg-gradient-to-r from-electric to-electric-dark rounded-full mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }}>
              <div className="aspect-[4/3] rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
                <img src="/techno-h-robot.jpg" alt="Techno-H Robot" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-2 py-1 text-[10px] font-semibold text-white bg-black/40 backdrop-blur-sm rounded-md">TECHNO-H · SERIES 01</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }}>
              <p className="text-gray-500 leading-relaxed mb-4">
                Welcome to Techno Drone Robotics, where innovation meets intelligent automation. The <strong className="text-navy">Techno-H Robot</strong> is an advanced AI-powered service robot designed to transform education, hospitality, healthcare, corporate spaces, exhibitions, and customer service environments.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                Combining artificial intelligence, autonomous navigation, and voice interaction, Techno-H delivers a smarter, safer, and more engaging experience. Whether greeting visitors, delivering items, assisting customers, or supporting educational demonstrations, Techno-H is built to improve efficiency while creating memorable interactions.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['AI Assistant', 'Autonomous', 'Voice Control', 'Smart Delivery', 'Obstacle Avoidance'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-medium bg-electric/5 text-electric rounded-full border border-electric/10">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-navy mb-2">Key Features</h3>
            <p className="text-gray-400 text-sm">Built with cutting-edge AI and robotics technology</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {[
              { icon: FiNavigation, title: 'Autonomous Navigation', desc: 'Navigate indoor environments intelligently using advanced cameras and ultrasonic sensors. Moves safely while avoiding obstacles in real time.' },
              { icon: FiMic, title: 'AI Voice Interaction', desc: 'Communicate naturally through intelligent voice recognition and speech responses. Users can ask questions and interact hands-free.' },
              { icon: FiWifi, title: 'Wi-Fi Connectivity', desc: 'Stay connected through seamless wireless communication for remote monitoring, software updates, and smart control.' },
              { icon: FiShield, title: 'Obstacle Avoidance', desc: 'Equipped with intelligent sensors that detect and avoid obstacles, ensuring smooth and safe operation in dynamic environments.' },
              { icon: FiCoffee, title: 'Smart Tray Delivery', desc: 'Efficiently delivers food, beverages, documents, medicines, and other items. Perfect for restaurants, hotels, hospitals, and offices.' },
              { icon: FiBattery, title: 'Long-Lasting Battery', desc: 'Powered by a high-capacity rechargeable battery for continuous and reliable operation throughout the day.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <TiltCard tiltDegree={5}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-electric/15 transition-all duration-300 h-full">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-blue-50 flex items-center justify-center mb-3">
                      <feature.icon className="text-electric" size={20} />
                    </div>
                    <h4 className="text-sm font-semibold text-navy mb-2">{feature.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h4 className="text-sm font-semibold text-navy mb-4">Applications</h4>
              <div className="flex flex-wrap gap-2">
                {['Educational Institutions', 'STEM Labs', 'Schools & Colleges', 'Hotels & Restaurants', 'Hospitals', 'Corporate Offices', 'Shopping Malls', 'Retail Stores', 'Reception Management', 'Trade Shows & Exhibitions', 'Smart Offices', 'Commercial Spaces'].map((app) => (
                  <span key={app} className="px-3 py-1.5 text-xs bg-gray-50 text-gray-600 rounded-lg border border-gray-100">{app}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h4 className="text-sm font-semibold text-navy mb-4">Why Choose Techno-H?</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {['AI-powered assistant', 'Human-friendly interaction', 'Safe autonomous navigation', 'Real-time obstacle detection', 'Smart voice communication', 'Efficient delivery system', 'Modern premium design', 'Reliable battery performance', 'Easy operation & maintenance', 'Customizable for industries'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <FiCheck size={12} className="text-electric shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* ============ FEEDBACK ============ */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gray-50/60">
        <AnimatedOrbs count={2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-electric bg-electric/[0.06] border border-electric/[0.12] rounded-full mb-5">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">Trusted by defence, agriculture, education, and enterprise teams worldwide.</p>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              className="w-12 h-0.5 bg-gradient-to-r from-electric to-electric-dark rounded-full mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Col. Rajeev Mehta', role: 'Defence Procurement, Indian Army', quote: 'The TDR-Kamikaze series exceeded our operational expectations. Autonomous targeting and swarm capability are battle-ready.', rating: 5 },
              { name: 'Dr. Ananya Sharma', role: 'Dean, IIT Delhi Robotics Lab', quote: 'Their STEM kits and lab setup transformed our robotics curriculum. Students went from theory to building drones in weeks.', rating: 5 },
              { name: 'Vikram Patil', role: 'CEO, GreenFields Agri', quote: 'Precision spraying with TDR-Agri reduced our chemical use by 40% while increasing yield coverage. ROI in one season.', rating: 5 },
              { name: 'Priya Kapoor', role: 'Director, SkyEvents', quote: 'The drone light show was the highlight of our festival. Flawless choreography and every formation was perfect.', rating: 5 },
              { name: 'Suresh Reddy', role: 'CMD, TechVista Enterprises', quote: 'Custom build quality is outstanding. They delivered a bespoke surveillance platform that no off-the-shelf product could match.', rating: 5 },
              { name: 'Neha Joshi', role: 'Principal, National Public School', quote: 'Students are absolutely fascinated by the Techno-H robot. It has become the centerpiece of our innovation lab.', rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-electric/15 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 italic">"{t.quote}"</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="text-[11px] text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <AnimatedOrbs count={2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get in" subtitle="Touch" />

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-blue-50 flex items-center justify-center shrink-0">
                      <item.icon className="text-electric" size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-navy mb-0.5">{item.label}</h4>
                      <p className="text-gray-500 text-xs">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl text-center py-16 border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                    <FiCheck size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-navy">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5" htmlFor="form-name">Full Name *</label>
                      <input id="form-name" type="text" name="name" value={form.name} onChange={handleChange} required
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-navy placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${formErrors.name ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-electric/40'}`}
                        placeholder="John Doe" aria-invalid={!!formErrors.name} aria-describedby={formErrors.name ? 'name-error' : undefined} />
                      {formErrors.name && <p id="name-error" className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5" htmlFor="form-email">Email *</label>
                      <input id="form-email" type="email" name="email" value={form.email} onChange={handleChange} required
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-navy placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${formErrors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-electric/40'}`}
                        placeholder="john@company.com" aria-invalid={!!formErrors.email} aria-describedby={formErrors.email ? 'email-error' : undefined} />
                      {formErrors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-electric/40 focus:bg-white transition-all"
                        placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Service Interested In</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy focus:outline-none focus:border-electric/40 focus:bg-white transition-all">
                        <option value="" className="bg-white">Select a service...</option>
                        <option value="mapping" className="bg-white">Aerial Mapping & Surveying</option>
                        <option value="inspection" className="bg-white">Inspection Services</option>
                        <option value="surveillance" className="bg-white">Security & Surveillance</option>
                        <option value="custom" className="bg-white">Custom Drone Builds</option>
                        <option value="training" className="bg-white">Training & Certification</option>
                        <option value="partnership" className="bg-white">R&D Partnership</option>
                        <option value="general" className="bg-white">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5" htmlFor="form-message">Message *</label>
                    <textarea id="form-message" name="message" value={form.message} onChange={handleChange} required rows={4}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-navy placeholder-gray-400 focus:outline-none focus:bg-white transition-all resize-none ${formErrors.message ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-electric/40'}`}
                      placeholder="Tell us about your project..." aria-invalid={!!formErrors.message} aria-describedby={formErrors.message ? 'message-error' : undefined} />
                    {formErrors.message && <p id="message-error" className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
                  </div>
                  {submitError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
                      {submitError}
                    </motion.div>
                  )}
                  <button type="submit" disabled={sending} aria-label="Send message"
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 shadow-lg shadow-electric/25">
                    {sending ? 'Sending...' : 'Send Message'} <FiSend />
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQ />

      <WaveDivider />

      {/* ============ CTA ============ */}
      <section className="py-20 relative bg-gradient-to-b from-gray-50/60 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-navy">
            Ready to <span className="text-gradient">Take Off</span>?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-gray-500 mb-8 max-w-xl mx-auto">
            Partner with Techno Drone Robotics and experience the next evolution of autonomous flight technology.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="btn-primary inline-flex items-center gap-2 justify-center shadow-lg shadow-electric/25">
              Request a Demo <FiArrowRight />
            </a>
            <Link to="/about" className="btn-outline inline-flex items-center gap-2 justify-center">
              About Us
            </Link>
          </motion.div>
        </div>
      </section>
      </main>
    </>
  );
}
