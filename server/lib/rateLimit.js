export function createRateLimit(opts = {}) {
  const windowMs = opts.windowMs || 15 * 60 * 1000;
  const max = opts.max || 100;
  const message = opts.message || { success: false, message: 'Too many requests, please try again later.' };
  const store = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now - entry.start > windowMs) store.delete(key);
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    let entry = store.get(key);
    if (!entry || now - entry.start > windowMs) {
      entry = { count: 0, start: now };
      store.set(key, entry);
    }
    entry.count++;
    res.setHeader('RateLimit-Limit', String(max));
    res.setHeader('RateLimit-Remaining', String(max - entry.count));
    res.setHeader('RateLimit-Reset', String(Math.ceil((entry.start + windowMs) / 1000)));
    if (entry.count > max) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(message));
      return;
    }
    next();
  };
}
