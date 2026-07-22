import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import productRoutes from './routes/products.js';
import blogRoutes from './routes/blog.js';
import jobRoutes from './routes/jobs.js';
import authRoutes from './routes/auth.js';
import { upload, uploadFile, uploadMultiple } from './controllers/uploadController.js';
import { protect } from './middleware/auth.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

import mongoose from 'mongoose';
let dbConnected = false;
connectDB().then((ok) => { dbConnected = ok; if (!ok) console.warn('Starting without database — some routes will return errors.'); });

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());

// CORS
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.CLIENT_URL || 'https://technodronerobotics.com']
  : ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/jobs', jobRoutes);

// Upload
app.post('/api/upload', protect, upload.single('file'), uploadFile);
app.post('/api/upload/multiple', protect, upload.array('files', 10), uploadMultiple);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'TDR API is running', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`TDR Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
