import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

const KEYLEN = 64;

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, KEYLEN).toString('hex');
  return `${salt}:${hash}`;
}

export function comparePassword(password, stored) {
  const [salt, key] = stored.split(':');
  const hash = scryptSync(password, salt, KEYLEN).toString('hex');
  return timingSafeEqual(Buffer.from(hash), Buffer.from(key));
}
