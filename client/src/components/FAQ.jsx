import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiPlus } from 'react-icons/fi';

const faqs = [
  { q: 'What types of drones does Techno Drone Robotics manufacture?', a: 'We manufacture a wide range of drones including FPV racing drones, agricultural sprayers, firefighting drones, loitering munitions (Kamikaze series), custom surveillance platforms, and AI-powered service robots.' },
  { q: 'Do you offer drone pilot training and certification?', a: 'Yes, we offer DGCA-certified drone pilot training programs with access to flight simulators, practical flying sessions, and comprehensive ground school covering regulations, meteorology, and navigation.' },
  { q: 'Can you build custom drones for specific mission requirements?', a: 'Absolutely. Our Custom Builds division specializes in bespoke UAV platforms tailored to your exact payload, endurance, range, and operational requirements. Contact us with your specifications.' },
  { q: 'What industries do you serve?', a: 'We serve defence, agriculture, firefighting, energy & utilities, construction, logistics, education, research institutions, and event management sectors across India and international markets.' },
  { q: 'Do you provide RPTO (Remote Pilot Training Organisation) setup assistance?', a: 'Yes, we provide end-to-end DGCA compliance support for establishing RPTOs including documentation, infrastructure planning, equipment supply, and faculty training.' },
  { q: 'What is the Techno-H Robot and what can it do?', a: 'Techno-H is an AI-powered service & educational robot capable of autonomous navigation, voice interaction, obstacle avoidance, and smart tray delivery. Ideal for education, hospitality, healthcare, and corporate environments.' },
  { q: 'Do you export drones internationally?', a: 'Yes, we export to select international markets subject to applicable export control regulations and end-user certifications. Contact our sales team for region-specific availability.' },
  { q: 'What warranty and after-sales support do you offer?', a: 'All our drones come with a standard 1-year warranty covering manufacturing defects. We also offer extended warranty plans, annual maintenance contracts, and 24/7 technical support.' },
  { q: 'Can you set up drone and robotics labs in educational institutions?', a: 'Yes, we provide turnkey drone & robotics laboratory setup including lab planning, equipment supply (drones, robots, 3D printers, electronics), curriculum design, and faculty training programs.' },
  { q: 'How can I request a demo or quotation?', a: 'You can use the contact form on our website, email us at technodroneroboticspvt.ltd@gmail.com, or call +91 8989846072. Our team will respond within 24 hours.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-electric bg-electric/5 border border-electric/10 rounded-full mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">Everything you need to know about our products, services, and support.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ delay: i * 0.03 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200 ${
                  open === i ? 'bg-electric/5 border-electric/20' : 'bg-white border-gray-100'
                } border hover:border-electric/20 shadow-sm hover:shadow-md`}>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  open === i ? 'bg-electric text-white rotate-45' : 'bg-gray-50 text-gray-400'
                }`}><FiPlus size={16} /></span>
                <span className="text-sm font-semibold text-navy flex-1">{faq.q}</span>
              </button>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
                  <div className="px-5 py-4 pl-[4.25rem] text-sm text-gray-500 leading-relaxed">{faq.a}</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
