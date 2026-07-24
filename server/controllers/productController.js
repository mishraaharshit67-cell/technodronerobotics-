import * as Product from '../models/Product.js';

export function getProducts(req, res, next) {
  const { category, search, page = 1, limit = 8 } = req.query;
  let query = { active: true };
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  const all = Product.findAll(query);
  const total = all.length;
  const start = (parseInt(page) - 1) * parseInt(limit);
  const data = all.slice(start, start + parseInt(limit));
  res.json({ success: true, count: data.length, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)), data });
}

export function getProduct(req, res, next) {
  const product = Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
}

export function getProductBySlug(req, res, next) {
  const product = Product.findBySlug(req.params.slug);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
}

export function createProduct(req, res, next) {
  const { name, category, description, specs, price, features, image } = req.body;
  const product = Product.create({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), category, description, specs: specs || [], price, features: features || [], image: image || '', active: true });
  res.status(201).json({ success: true, data: product });
}

export function updateProduct(req, res, next) {
  const product = Product.update(req.params.id, { $set: req.body });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
}

export function deleteProduct(req, res, next) {
  const ok = Product.remove(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product deleted' });
}
