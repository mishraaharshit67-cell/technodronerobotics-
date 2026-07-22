import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
  author: { type: String, required: true },
  tags: [{ type: String }],
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  readTime: { type: String, default: '5 min read' },
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);
