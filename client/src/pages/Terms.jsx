import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';

export default function Terms() {
  return (
    <PageTransition>
      <SEOHead title="Terms of Service | Techno Drone Robotics" description="Terms of Service of Techno Drone Robotics." path="/terms-of-service" />
      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Terms of Service" subtitle="Last updated: January 2025" />
          <div className="prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed space-y-4">
            <p>By accessing or using the Techno Drone Robotics website, you agree to be bound by these Terms of Service.</p>
            <h3 className="text-navy font-semibold text-base">Intellectual Property</h3>
            <p>All content, trademarks, and intellectual property on this website are owned by Techno Drone Robotics. You may not reproduce, distribute, or modify any content without prior written consent.</p>
            <h3 className="text-navy font-semibold text-base">Products & Services</h3>
            <p>Product specifications, pricing, and availability are subject to change without notice. Custom drone builds are subject to separate agreements.</p>
            <h3 className="text-navy font-semibold text-base">Limitation of Liability</h3>
            <p>Techno Drone Robotics shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
            <h3 className="text-navy font-semibold text-base">Contact</h3>
            <p>For questions about these terms, contact us at technodroneroboticspvt.ltd@gmail.com.</p>
            <p className="pt-4"><Link to="/" className="text-electric hover:underline">Back to Home</Link></p>
          </div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
