import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';

export default function Blog() {

  return (
    <PageTransition>
      <SEOHead
        title="Blog | Techno Drone Robotics"
        description="Latest news, articles, and insights from Techno Drone Robotics - drone technology, AI, industry updates, and case studies."
        path="/blog"
      />

      <main>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle as="h1" title="Blog & News" subtitle="Insights, updates, and deep dives from the frontlines of drone technology." />

          <div className="text-center py-20">
            <p className="text-lg text-gray-500 mb-2">No blog posts available</p>
            <p className="text-sm text-gray-400">New content will appear here soon.</p>
          </div>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
