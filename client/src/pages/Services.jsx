import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCamera, FiTool, FiBookOpen, FiMap, FiShield, FiSearch, FiTarget, FiMonitor, FiWind, FiLayers, FiPrinter, FiHeart, FiCpu, FiAward } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';

const services = [
  { icon: FiTarget, title: 'Drone Pilot Training', desc: 'Comprehensive drone pilot training programs with certification covering flight operations, regulations, safety protocols, and advanced manoeuvres for professional pilots.', features: ['DGCA Certified', 'Flight Simulator', 'Practical Flying', 'Safety Protocols'] },
  { icon: FiBookOpen, title: 'Robotics & Drone Training', desc: 'Hands-on training in robotics and drone technology covering assembly, programming, maintenance, and real-world applications for students and professionals.', features: ['Robot Assembly', 'Drone Programming', 'Sensor Integration', 'Maintenance'] },
  { icon: FiMonitor, title: 'Drone Colour Show', desc: 'Spectacular choreographed drone light shows with hundreds of LED-equipped drones creating custom formations, logos, and animations for events and celebrations.', features: ['Custom Formations', 'LED Choreography', 'Event Integration', 'Night Shows'] },
  { icon: FiLayers, title: 'Minor & Major Projects', desc: 'End-to-end project development support for engineering and diploma students — from concept and design to prototyping and deployment for academic projects.', features: ['Concept Design', 'Prototyping', 'Documentation', 'Deployment'] },
  { icon: FiCpu, title: 'IoT & Arduino Projects', desc: 'Custom IoT and Arduino-based project development for smart automation, sensor networks, data logging, and embedded systems for education and industry.', features: ['Arduino Dev', 'Sensor Networks', 'IoT Integration', 'Smart Automation'] },
  { icon: FiHeart, title: 'Flower Dropping Service', desc: 'Aerial flower dropping service using precision drones for weddings, celebrations, memorials, and special events with customizable payload release mechanisms.', features: ['Custom Drop Zones', 'Event Coordination', 'Precision Release', 'All Weather'] },
  { icon: FiWind, title: 'Aeromodelling', desc: 'Aeromodelling training, kits, and workshops covering aircraft design, radio control, flight dynamics, and building techniques for hobbyists and aspiring aerospace engineers.', features: ['RC Aircraft', 'Glider Building', 'Flight Dynamics', 'Competition Prep'] },
  { icon: FiPrinter, title: '3D Printing Design', desc: 'Professional 3D modelling and printing services for drone parts, robotics components, custom enclosures, prototypes, and educational models using advanced CAD and FDM/SLA printing.', features: ['CAD Modelling', 'FDM Printing', 'SLA Printing', 'Design Optimization'] },
  { icon: FiMap, title: 'Aerial Mapping & Surveying', desc: 'High-resolution 2D orthomosaics and 3D models for construction, mining, and agriculture using LiDAR and photogrammetry.', features: ['LiDAR Scanning', 'Photogrammetry', 'Thermal Mapping', 'Volume Calculations'] },
  { icon: FiCamera, title: 'Inspection Services', desc: 'Non-destructive aerial inspection of infrastructure including power lines, pipelines, bridges, wind turbines, and cell towers.', features: ['Power Line Insp.', 'Pipeline Surveys', 'Wind Turbine Checks', 'Bridge Inspections'] },
  { icon: FiShield, title: 'Security & Surveillance', desc: 'Persistent aerial monitoring for perimeters, large events, and critical infrastructure with real-time AI threat detection.', features: ['Perimeter Patrol', 'Event Security', 'AI Threat Detection', 'Real-time Monitoring'] },
  { icon: FiTool, title: 'Custom Drone Builds', desc: 'Bespoke drone design and manufacturing for specialized industrial, research, and defense applications.', features: ['Custom Design', 'Prototyping', 'Payload Integration', 'Certification Support'] },
  { icon: FiSearch, title: 'R&D Partnerships', desc: 'Collaborative research programs in autonomous flight, computer vision, swarm intelligence, and drone delivery systems.', features: ['AI Research', 'Swarm Tech', 'Delivery Systems', 'Sensor Fusion'] },
];

export default function Services() {
  return (
    <PageTransition>
      <SEOHead
        title="Services | Techno Drone Robotics"
        description="Comprehensive drone and robotics services - pilot training, drone light shows, IoT projects, aeromodelling, 3D printing, aerial mapping, and more."
        path="/services"
      />

      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle as="h1" title="Our Services" subtitle="From drone pilot training and light shows to IoT projects, aeromodelling, 3D printing, and industrial solutions — we do it all." />

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric/10 to-electric-subtle flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <service.icon className="text-electric" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span key={f} className="px-3 py-1 text-xs font-mono bg-electric/10 text-electric/80 rounded-full">{f}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-12 card"
          >
            <h3 className="text-2xl font-bold mb-3">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">Our engineering team can design and deploy tailored drone solutions for your specific industry requirements.</p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Our Team <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
