import { validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost.js';

export const getPosts = async (req, res) => {
  try {
    const { tag, featured, limit, page = 1 } = req.query;
    const filter = { published: true };
    if (tag) filter.tags = tag;
    if (featured === 'true') filter.featured = true;
    const pageSize = parseInt(limit) || 20;
    const skip = (parseInt(page) - 1) * pageSize;
    const posts = await BlogPost.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
    const total = await BlogPost.countDocuments(filter);
    res.json({ success: true, count: posts.length, total, page: parseInt(page), pages: Math.ceil(total / pageSize), data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const post = await BlogPost.create({ ...req.body, author: req.body.author || req.admin?.name || 'TDR Team' });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'A post with this slug already exists' });
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
