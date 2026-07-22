import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import { FiChevronDown, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';

const team = [
  { name: 'Dr. Arjun Mehta', role: 'Founder & CEO', bio: 'PhD in Aerospace Engineering with 15+ years in UAV systems. Former DRDO scientist leading autonomous flight research.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Priya Sharma', role: 'CTO', bio: 'Expert in computer vision and AI. Previously led ML teams at major tech companies. Driving TDR\'s autonomous navigation stack.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  { name: 'Vikram Patel', role: 'Head of Engineering', bio: '15 years in embedded systems and drone hardware design. Built TDR\'s entire product line from concept to production.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  { name: 'Dr. Neha Gupta', role: 'Director of R&D', bio: 'PhD in Robotics from IIT Bombay. Published 30+ papers in autonomous systems. Leads swarm intelligence research.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
  { name: 'Rajesh Kumar', role: 'VP of Operations', bio: 'Operations expert scaling drone manufacturing from prototype to mass production. 20 years in aerospace manufacturing.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
  { name: 'Ananya Reddy', role: 'Head of Training', bio: 'DGCA-certified drone instructor. Trained 2000+ pilots across defence, agriculture, and enterprise sectors.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
  { name: 'Suresh Iyer', role: 'Chief Business Officer', bio: 'Strategic business development leader who built TDR\'s partner network across 15 countries. Former defence sector consultant.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80' },
  { name: 'Kavita Joshi', role: 'Head of Marketing', bio: 'Marketing strategist specializing in deep-tech B2B and defence sector communications. Built TDR\'s global brand presence.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
];

export default function Team() {
  const [expanded, setExpanded] = useState(null);

  return (
    <PageTransition>
      <SEOHead title="Our Team | Techno Drone Robotics" description="Meet the leadership team behind Techno Drone Robotics - pioneers in autonomous drone technology." path="/team" />
      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle as="h1" title="Our Team" subtitle="Meet the brilliant minds driving the future of autonomous drone technology." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy">{member.name}</h3>
                  <p className="text-xs font-semibold text-gradient mb-3">{member.role}</p>
                  <p className={`text-xs text-gray-500 leading-relaxed transition-all ${expanded === i ? '' : 'line-clamp-2'}`}>{member.bio}</p>
                  {member.bio.length > 100 && (
                    <button onClick={() => setExpanded(expanded === i ? null : i)} className="text-electric text-[10px] font-semibold mt-1 hover:underline">
                      {expanded === i ? 'Show less' : 'Read more'}
                    </button>
                  )}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    <a href="#" className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-electric/10 hover:text-electric transition-all"><FiLinkedin size={14} /></a>
                    <a href="#" className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-electric/10 hover:text-electric transition-all"><FiMail size={14} /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
