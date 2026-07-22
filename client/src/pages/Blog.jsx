import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight, FiTag, FiSearch, FiX } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import { fetchBlogPosts } from '../api';

const PAGE_SIZE = 6;

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    setVisible(PAGE_SIZE);
    fetchBlogPosts(activeTag === 'All' ? undefined : activeTag)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [activeTag]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [search]);

  const allTags = ['All', ...new Set(posts.flatMap((p) => p.tags || []))];
  const filtered = posts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(0, visible);
  const featured = paginated.filter((p) => p.featured);
  const regular = paginated.filter((p) => !p.featured);

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

          <div className="relative max-w-md mx-auto mb-6">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..." autoFocus
              className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-electric/40 transition-colors" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><FiX size={14} /></button>}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {allTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTag === tag
                    ? 'bg-gradient-to-r from-electric to-electric-dark text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}>
                {tag}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-2.5 h-2.5 bg-electric rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {featured.map((post, i) => (
                    <Link to={`/blog/${post.slug}`} key={post._id || post.title}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="card group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-electric to-electric-dark text-xs font-semibold rounded-bl-lg text-white">
                        Featured
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1"><FiCalendar size={12} />{post.date || new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><FiClock size={12} />{post.readTime || '5 min read'}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-electric transition-colors">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">By {post.author}</span>
                        <span className="text-electric text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1" aria-label={`Read article: ${post.title}`}>
                          Read <FiArrowRight size={14} />
                        </span>
                      </div>
                      <div className="flex gap-1.5 mt-3">
                        {(post.tags || []).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 bg-electric/10 text-electric/70 rounded-full">{t}</span>
                        ))}
                      </div>
                    </motion.article>
                    </Link>
                  ))}
                </div>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regular.map((post, i) => (
                  <Link to={`/blog/${post.slug}`} key={post._id || post.title}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="card group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                      <span className="flex items-center gap-1"><FiCalendar size={12} />{post.date || new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><FiClock size={12} />{post.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-electric transition-colors">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">By {post.author}</span>
                      <span className="text-electric text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1" aria-label={`Read article: ${post.title}`}>
                        Read <FiArrowRight size={14} />
                      </span>
                    </div>
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {(post.tags || []).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 bg-electric/10 text-electric/70 rounded-full">{t}</span>
                      ))}
                    </div>
                  </motion.article>
                  </Link>
                ))}
              </div>
              {!loading && paginated.length < filtered.length && (
                <div className="text-center mt-10">
                  <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline inline-flex items-center gap-2 text-sm">Load More ({filtered.length - paginated.length} remaining)</button>
                </div>
              )}
              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-lg text-gray-500 mb-2">No articles found</p>
                  <p className="text-sm text-gray-400 mb-4">Try a different search term or tag filter.</p>
                  <button onClick={() => { setSearch(''); setActiveTag('All'); }} className="text-electric hover:underline text-sm">Clear all filters</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
