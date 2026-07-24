import { verifyToken, signToken } from '../lib/jwt.js';
import * as Admin from '../models/Admin.js';

export function protect(req, res, next) {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET || 'tdr-jwt-secret');
    if (!decoded) throw new Error('Invalid token');
    const admin = Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ success: false, message: 'Admin not found' });
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
}

export function adminOnly(req, res, next) {
  if (req.admin?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
}

export function generateToken(id) {
  return signToken({ id }, process.env.JWT_SECRET || 'tdr-jwt-secret', '7d');
}
