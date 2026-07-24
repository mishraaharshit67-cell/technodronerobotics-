import * as BlogPost from '../models/BlogPost.js';

export function getPosts(req, res, next) {
  const { tag, search, page = 1, limit = 6 } = req.query;
  let query = { published: true };
  if (tag) query.tags = { $in: [tag] };
  if (search) query.title = { $regex: search, $options: 'i' };
  const all = BlogPost.findAll(query);
  const total = all.length;
  const start = (parseInt(page) - 1) * parseInt(limit);
  const col = BlogPost.findAll();
  col.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filtered = col.filter((p) => {
    if (!p.published) return false;
    if (tag && (!p.tags || !p.tags.includes(tag))) return false;
    if (search && !p.title?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const data = filtered.slice(start, start + parseInt(limit));
  res.json({ success: true, count: data.length, total: filtered.length, page: parseInt(page), pages: Math.ceil(filtered.length / parseInt(limit)), data });
}

export function getPost(req, res, next) {
  const post = BlogPost.findBySlug(req.params.slug);
  if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
  res.json({ success: true, data: post });
}

export function createPost(req, res, next) {
  const { title, content, excerpt, author, tags, featured } = req.body;
  const post = BlogPost.create({ title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), content, excerpt: excerpt || content.slice(0, 200), author: author || 'TDR Team', tags: tags || [], featured: !!featured, published: true });
  res.status(201).json({ success: true, data: post });
}

export function updatePost(req, res, next) {
  const post = BlogPost.update(req.params.id, { $set: req.body });
  if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
  res.json({ success: true, data: post });
}

export function deletePost(req, res, next) {
  const ok = BlogPost.remove(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: 'Post not found' });
  res.json({ success: true, message: 'Post deleted' });
}
