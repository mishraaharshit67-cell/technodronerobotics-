import { createHmac, timingSafeEqual } from 'crypto';

function base64UrlEncode(buf) {
  return buf.toString('base64url');
}

function base64UrlDecode(str) {
  return Buffer.from(str, 'base64url');
}

function sign(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerStr = base64UrlEncode(Buffer.from(JSON.stringify(header)));
  const payloadStr = base64UrlEncode(Buffer.from(JSON.stringify(payload)));
  const data = `${headerStr}.${payloadStr}`;
  const sig = createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function verify(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [headerStr, payloadStr, sigStr] = parts;
  const expectedSig = createHmac('sha256', secret).update(`${headerStr}.${payloadStr}`).digest('base64url');
  try {
    if (!timingSafeEqual(Buffer.from(sigStr), Buffer.from(expectedSig))) return null;
  } catch { return null; }
  const payload = JSON.parse(base64UrlDecode(payloadStr).toString());
  if (payload.exp && Date.now() >= payload.exp * 1000) return null;
  return payload;
}

export function signToken(payload, secret, expiresIn = '7d') {
  const ms = expiresIn.endsWith('d') ? parseInt(expiresIn) * 86400000
    : expiresIn.endsWith('h') ? parseInt(expiresIn) * 3600000
    : expiresIn.endsWith('m') ? parseInt(expiresIn) * 60000
    : 86400000 * 7;
  return sign({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor((Date.now() + ms) / 1000) }, secret);
}

export function verifyToken(token, secret) {
  return verify(token, secret);
}
