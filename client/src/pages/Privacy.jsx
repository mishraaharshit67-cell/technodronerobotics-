import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';

export default function Privacy() {
  return (
    <PageTransition>
      <SEOHead title="Privacy Policy | Techno Drone Robotics" description="Privacy Policy of Techno Drone Robotics." path="/privacy-policy" />
      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Privacy Policy" subtitle="Last updated: January 2025" />
          <div className="prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed space-y-4">
            <p>Techno Drone Robotics ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
            <h3 className="text-navy font-semibold text-base">Information We Collect</h3>
            <p>We collect information you voluntarily provide, such as your name, email address, phone number, and company when you fill out contact forms, subscribe to newsletters, or apply for jobs.</p>
            <h3 className="text-navy font-semibold text-base">How We Use Your Information</h3>
            <p>We use your information to respond to inquiries, process job applications, send newsletters (with consent), improve our services, and comply with legal obligations.</p>
            <h3 className="text-navy font-semibold text-base">Data Protection</h3>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            <h3 className="text-navy font-semibold text-base">Contact</h3>
            <p>For privacy-related inquiries, contact us at technodroneroboticspvt.ltd@gmail.com.</p>
            <p className="pt-4"><Link to="/" className="text-electric hover:underline">Back to Home</Link></p>
          </div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
