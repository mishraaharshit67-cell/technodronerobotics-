import { createApp, jsonResponse } from './lib/http.js';
import { loadEnv } from './lib/env.js';
import { createCors } from './lib/cors.js';
import { createHelmet } from './lib/helmet.js';
import { createCompression } from './lib/compress.js';
import { createRateLimit } from './lib/rateLimit.js';
import { createUpload } from './lib/upload.js';
import { register, login, getMe, registerValidation, loginValidation } from './controllers/authController.js';
import { submitContact, getContacts } from './controllers/contactController.js';
import { subscribe, getSubscribers, unsubscribe } from './controllers/newsletterController.js';
import { getProducts, getProduct, getProductBySlug, createProduct, updateProduct, deleteProduct } from './controllers/productController.js';
import { getPosts, getPost, createPost, updatePost, deletePost } from './controllers/blogController.js';
import { getJobs, getJob, createJob, updateJob, deleteJob } from './controllers/jobController.js';
import { uploadFile, uploadMultiple } from './controllers/uploadController.js';
import { protect, adminOnly } from './middleware/auth.js';
import { body } from './lib/validate.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = createApp();
const PORT = process.env.PORT || 5000;

app.use(createCors({
  origin: process.env.NODE_ENV === 'production' ? [process.env.CLIENT_URL || 'https://technodronerobotics.com'] : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(createHelmet());
app.use(createCompression());
app.use(createRateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.static(path.join(__dirname, '..', 'client', 'dist'));

const upload = createUpload({ maxSize: 10 * 1024 * 1024 });

// Auth
app.post('/api/auth/register', ...registerValidation, register);
app.post('/api/auth/login', ...loginValidation, login);
app.get('/api/auth/me', protect, getMe);

// Contact
app.post('/api/contact', body('name').trim().notEmpty().withMessage('Name is required'), body('email').isEmail().normalizeEmail().withMessage('Valid email required'), body('message').trim().notEmpty().withMessage('Message is required'), submitContact);
app.get('/api/contact', protect, getContacts);

// Newsletter
app.post('/api/newsletter', body('email').isEmail().normalizeEmail().withMessage('Valid email required'), subscribe);
app.get('/api/newsletter', protect, getSubscribers);
app.delete('/api/newsletter/:email', unsubscribe);

// Products
app.get('/api/products', getProducts);
app.get('/api/products/slug/:slug', getProductBySlug);
app.get('/api/products/:id', getProduct);
app.post('/api/products', protect, body('name').trim().notEmpty().withMessage('Name is required'), body('category').trim().notEmpty().withMessage('Category is required'), body('description').trim().notEmpty().withMessage('Description is required'), createProduct);
app.put('/api/products/:id', protect, updateProduct);
app.delete('/api/products/:id', protect, deleteProduct);

// Blog
app.get('/api/blog', getPosts);
app.get('/api/blog/:slug', getPost);
app.post('/api/blog', protect, body('title').trim().notEmpty().withMessage('Title is required'), body('content').trim().notEmpty().withMessage('Content is required'), createPost);
app.put('/api/blog/:id', protect, updatePost);
app.delete('/api/blog/:id', protect, deletePost);

// Jobs
app.get('/api/jobs', getJobs);
app.get('/api/jobs/:id', getJob);
app.post('/api/jobs', protect, body('title').trim().notEmpty().withMessage('Title is required'), body('dept').trim().notEmpty().withMessage('Department is required'), body('location').trim().notEmpty().withMessage('Location is required'), createJob);
app.put('/api/jobs/:id', protect, updateJob);
app.delete('/api/jobs/:id', protect, deleteJob);

// Upload
app.post('/api/upload', protect, (req, res, next) => upload(req, res, () => uploadFile(req, res, next)));
app.post('/api/upload/multiple', protect, (req, res, next) => upload(req, res, () => uploadMultiple(req, res, next)));

// Uploads static
app.get('/uploads/:file', (req, res) => {
  const fp = path.join(__dirname, 'uploads', req.params.file);
  if (!fs.existsSync(fp)) return jsonResponse(res, 404, { success: false, message: 'File not found' });
  const extMap = { '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.pdf': 'application/pdf' };
  const content = fs.readFileSync(fp);
  res.writeHead(200, { 'Content-Type': extMap[path.extname(req.params.file).toLowerCase()] || 'application/octet-stream', 'Content-Length': content.length });
  res.end(content);
});

// Health
app.get('/api/health', (req, res) => {
  jsonResponse(res, 200, { success: true, message: 'TDR API is running', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.setNotFoundHandler(notFound);
app.setErrorHandler(errorHandler);

app.listen(PORT, () => {
  console.log(`TDR Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
