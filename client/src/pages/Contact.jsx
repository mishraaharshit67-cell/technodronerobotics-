import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import { submitContact } from '../api';
import { useToast } from '../context/ToastContext';

const contactInfo = [
  { icon: FiMapPin, label: 'Address', value: 'Ayodhaya Nagar\nBhopal-462041' },
  { icon: FiPhone, label: 'Phone', value: '+91 8989846072 / 8989560802' },
  { icon: FiMail, label: 'Email', value: 'technodroneroboticspvt.ltd@gmail.com' },
  { icon: FiClock, label: 'Hours', value: 'Mon–Fri: 8 AM – 6 PM\nSat: 9 AM – 2 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const { addToast } = useToast();

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
    try {
      await submitContact(form);
      setSubmitted(true);
      addToast('Message sent successfully!', 'success');
    } catch {
      setSubmitError('Failed to send. Please try again later.');
      addToast('Failed to send message', 'error');
    }
    setSending(false);
  };

  return (
    <PageTransition>
      <SEOHead
        title="Contact Us | Techno Drone Robotics"
        description="Get in touch with Techno Drone Robotics. Request a demo, quote, or partnership inquiry."
        path="/contact"
      />

      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Contact Us" subtitle="Have a project in mind? Let's talk about how TDR can help you achieve your goals." />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-electric" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">{item.label}</h4>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <FiMapPin className="mx-auto mb-2" size={32} />
                  <p className="text-sm">Interactive map</p>
                  <p className="text-xs text-gray-500">Google Maps integration</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <FiCheck size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-2">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <p className="text-sm text-gray-600">In the meantime, explore our <a href="/products" className="text-electric hover:underline">products</a>.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="card"
                >
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1" htmlFor="contact-name">Full Name *</label>
                      <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} required
                        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:border-electric/50 transition-colors ${formErrors.name ? 'border-red-300' : 'border-electric/20'}`}
                        placeholder="John Doe" aria-invalid={!!formErrors.name} aria-describedby={formErrors.name ? 'contact-name-error' : undefined} />
                      {formErrors.name && <p id="contact-name-error" className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1" htmlFor="contact-email">Email *</label>
                      <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} required
                        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:border-electric/50 transition-colors ${formErrors.email ? 'border-red-300' : 'border-electric/20'}`}
                        placeholder="john@company.com" aria-invalid={!!formErrors.email} aria-describedby={formErrors.email ? 'contact-email-error' : undefined} />
                      {formErrors.email && <p id="contact-email-error" className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Company</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-electric/20 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:border-electric/50 transition-colors" placeholder="Company Inc." />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-electric/20 rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:border-electric/50 transition-colors" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Service Interested In</label>
                    <select name="service" value={form.service} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-electric/20 rounded-lg text-navy focus:outline-none focus:border-electric/50 transition-colors">
                      <option value="">Select a service...</option>
                      <option value="mapping">Aerial Mapping & Surveying</option>
                      <option value="inspection">Inspection Services</option>
                      <option value="surveillance">Security & Surveillance</option>
                      <option value="custom">Custom Drone Builds</option>
                      <option value="training">Training & Certification</option>
                      <option value="partnership">R&D Partnership</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-1" htmlFor="contact-message">Message *</label>
                    <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required rows={5}
                      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-navy placeholder-gray-400 focus:outline-none focus:border-electric/50 transition-colors resize-none ${formErrors.message ? 'border-red-300' : 'border-electric/20'}`}
                      placeholder="Tell us about your project..." aria-invalid={!!formErrors.message} aria-describedby={formErrors.message ? 'contact-message-error' : undefined} />
                    {formErrors.message && <p id="contact-message-error" className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
                  </div>
                  {submitError && (
                    <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">{submitError}</div>
                  )}
                  <button type="submit" disabled={sending} className="btn-primary w-full inline-flex items-center justify-center gap-2 text-lg">
                    {sending ? 'Sending...' : 'Send Message'} <FiSend />
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
