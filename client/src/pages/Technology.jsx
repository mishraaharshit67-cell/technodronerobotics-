import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiWifi, FiCamera, FiServer, FiLayers, FiZap } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';

const TechParticleCanvas = lazy(() => import('../components/TechParticleCanvas'));

const techFeatures = [
  { icon: FiCpu, title: 'AI Flight Controller', desc: 'On-board neural processor for real-time obstacle avoidance, path optimization, and autonomous decision-making.' },
  { icon: FiWifi, title: 'Mesh Networking', desc: 'Multi-drone mesh network with redundant communication links for swarm operations beyond visual line of sight.' },
  { icon: FiCamera, title: 'Multi-Spectral Vision', desc: 'Fusion of RGB, thermal, LiDAR, and multispectral sensors for comprehensive environmental awareness.' },
  { icon: FiServer, title: 'Edge Computing', desc: 'On-device processing eliminates latency — real-time analytics without cloud dependency.' },
  { icon: FiLayers, title: 'Digital Twin Integration', desc: 'Real-time 3D model generation creates digital twins of surveyed environments.' },
  { icon: FiZap, title: 'Hybrid Propulsion', desc: 'Electric-hydrogen hybrid power systems delivering extended flight endurance up to 24 hours.' },
];

const specs = [
  { label: 'Processor', value: 'TDR Neural Core v4 — 45 TOPS' },
  { label: 'Connectivity', value: '5G / SATCOM / Mesh (Triple Redundant)' },
  { label: 'Positioning', value: 'RTK GPS + GLONASS + Galileo (cm accuracy)' },
  { label: 'Sensor Suite', value: 'LiDAR 300m / Thermal 640×512 / 4K 60fps / MSI' },
  { label: 'Flight Time', value: '45 min — 24 hrs (hybrid)' },
  { label: 'Operating Range', value: '15 km — 200 km (SATCOM)' },
];

export default function Technology() {
  return (
    <PageTransition>
      <SEOHead
        title="Technology & Innovation | Techno Drone Robotics"
        description="Discover the cutting-edge technology behind TDR drones - AI flight controllers, mesh networking, multi-spectral vision, and hybrid propulsion."
        path="/technology"
      />

      <main>
      {/* Tech Hero */}
      <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <TechParticleCanvas />
          </Suspense>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            The Technology Behind <span className="text-gradient">the Future</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our drones are powered by a vertically integrated technology stack — from custom silicon to autonomous AI — engineered for reliability in the most demanding environments.
          </motion.p>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Innovation Stack" subtitle="Every component is designed, tested, and manufactured to aerospace standards." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {techFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-electric/10 to-electric-subtle flex items-center justify-center mb-4">
                  <feature.icon className="text-electric" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <SectionTitle title="Technical Specifications" subtitle="Our flagship platform, the TDR Neural Core." />

          <div className="max-w-3xl mx-auto">
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between py-4 border-b border-electric/10 last:border-0"
              >
                <span className="text-gray-600 text-sm font-mono">{spec.label}</span>
                <span className="text-navy text-sm font-medium text-right">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-electric/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="R&D Pipeline" subtitle="What's next? Here's what our research team is working on." />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Swarm Intelligence', desc: 'Decentralized multi-agent coordination for large-scale autonomous operations without central control.', eta: 'Q3 2026' },
              { title: 'Hydrogen Fuel Cells', desc: 'Next-generation hybrid power delivering 24+ hour flight endurance with zero emissions.', eta: 'Q1 2027' },
              { title: 'Urban Air Mobility', desc: 'Autonomous air taxi platform for urban transportation and logistics in smart cities.', eta: '2028' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="text-xs font-mono text-gradient mb-2">ETA: {item.eta}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
