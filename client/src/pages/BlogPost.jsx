import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowLeft, FiTag, FiShare2, FiCheck } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import SEOHead from '../components/SEOHead';
import API from '../api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    API.get(`/blog/${slug}`)
      .then(({ data }) => setPost(data.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <PageTransition>
        <main className="pt-32 pb-20 min-h-screen">
          <div className="max-w-3xl mx-auto px-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-8" />
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded w-full" />)}
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <SEOHead title="Post Not Found | Techno Drone Robotics" description="The blog post you're looking for doesn't exist." path={`/blog/${slug}`} noindex />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">This article may have been removed or the link is broken.</p>
            <Link to="/blog" className="btn-primary inline-flex items-center gap-2"><FiArrowLeft /> Back to Blog</Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEOHead
        title={`${post.title} | Techno Drone Robotics`}
        description={post.excerpt || post.title}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "author": { "@type": "Person", "name": post.author },
          "datePublished": post.createdAt,
          "publisher": { "@type": "Organization", "name": "Techno Drone Robotics" }
        }]}
      />
      <main>
      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-electric mb-8 transition-colors">
            <FiArrowLeft size={16} /> Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1"><FiCalendar size={12} />{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><FiClock size={12} />{post.readTime || '5 min read'}</span>
              <div className="ml-auto flex items-center gap-2">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-sky-50 hover:text-sky-500 transition-all" aria-label="Share on Twitter">
                  <FaTwitter size={14} />
                </a>
                <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all" aria-label="Share on LinkedIn">
                  <FaLinkedin size={14} />
                </a>
                <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all" aria-label="Share on Facebook">
                  <FaFacebook size={14} />
                </a>
                <button onClick={shareUrl} className="flex items-center gap-1 text-electric hover:underline text-xs">
                  {copied ? <><FiCheck size={12} /> Copied</> : <><FiShare2 size={12} /> Copy</>}
                </button>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-gray-500 text-lg mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-electric-dark flex items-center justify-center text-white font-bold text-sm">
                {post.author?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {(post.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs bg-electric/10 text-electric/80 rounded-full flex items-center gap-1">
                    <FiTag size={10} /> {t}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-gray max-w-none border-t border-gray-100 pt-8">
              <div className="leading-relaxed text-gray-700 whitespace-pre-line">{post.content}</div>
            </div>
          </motion.div>
        </div>
      </article>
      </main>
    </PageTransition>
  );
}
