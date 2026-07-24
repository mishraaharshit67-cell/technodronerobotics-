import db from '../lib/database.js';
import { hashPassword, comparePassword } from '../lib/hash.js';

const admins = () => db.collection('admins');

export function findByEmail(email) {
  return admins().findOne({ email });
}

export function findById(id) {
  return admins().findById(id);
}

export function create({ name, email, password, role }) {
  return admins().insertOne({ name, email, password: hashPassword(password), role: role || 'admin' });
}

export { comparePassword };
