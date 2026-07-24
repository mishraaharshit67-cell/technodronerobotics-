import { body, validationResult } from '../lib/validate.js';
import * as Admin from '../models/Admin.js';
import { generateToken, protect } from '../middleware/auth.js';

export function register(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { name, email, password } = req.body;
  const exists = Admin.findByEmail(email);
  if (exists) return res.status(400).json({ success: false, message: 'Admin already exists' });
  const admin = Admin.create({ name, email, password });
  const token = generateToken(admin._id);
  res.status(201).json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
}

export function login(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { email, password } = req.body;
  const admin = Admin.findByEmail(email);
  if (!admin || !Admin.comparePassword(password, admin.password)) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  const token = generateToken(admin._id);
  res.json({ success: true, token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
}

export function getMe(req, res, next) {
  res.json({ success: true, admin: req.admin });
}

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('secret').equals(process.env.ADMIN_SECRET || 'tdr-admin-secret').withMessage('Invalid registration secret'),
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
];
