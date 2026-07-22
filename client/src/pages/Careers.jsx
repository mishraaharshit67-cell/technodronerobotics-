import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiClock, FiChevronDown, FiSend } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import { fetchJobs } from '../api';

const perks = [
  'Competitive salary + equity', 'Health, dental & vision insurance', 'Unlimited PTO', '401(k) matching',
  'Annual learning budget', 'Latest hardware & tools', 'Remote-friendly culture', 'Weekly team lunches',
  'Flight test days', 'Conference attendance',
];

export default function Careers() {
  const [expanded, setExpanded] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const activeJobs = jobs.filter((j) => j.active !== false);

  return (
    <PageTransition>
      <SEOHead
        title="Careers | Techno Drone Robotics"
        description="Join Techno Drone Robotics - careers in autonomous flight, AI, robotics engineering, and drone operations."
        path="/careers"
      />

      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle as="h1" title="Join the Team" subtitle="Build the future of autonomous flight with world-class engineers, researchers, and operators." />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-center text-lg font-semibold mb-6">Why Join TDR?</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {perks.map((perk) => (
                <span key={perk} className="px-4 py-2 bg-white border border-electric/10 rounded-lg text-sm text-gray-700">{perk}</span>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-2.5 h-2.5 bg-electric rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {activeJobs.map((job, i) => (
                <motion.div key={job._id || job.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <button onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full card text-left group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-electric transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1"><FiBriefcase size={12} />{job.dept}</span>
                          <span className="flex items-center gap-1"><FiMapPin size={12} />{job.location}</span>
                          <span className="flex items-center gap-1"><FiClock size={12} />{job.type}</span>
                        </div>
                      </div>
                      <FiChevronDown className={`text-gray-600 mt-1 transition-transform ${expanded === i ? 'rotate-180' : ''}`} size={20} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white rounded-b-xl border border-electric/10 border-t-0 -mt-1">
                          <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                          {job.requirements && job.requirements.length > 0 && (
                            <>
                              <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
                              <ul className="space-y-1.5 mb-6">
                                {job.requirements.map((req) => (
                                  <li key={req} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="text-electric mt-1">•</span> {req}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          <button className="btn-primary text-sm inline-flex items-center gap-2">
                            Apply Now <FiSend size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              {activeJobs.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-lg font-medium mb-1">No open positions right now</p>
                  <p className="text-sm">Check back soon or follow us on LinkedIn for future opportunities.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
