export function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.pathname} not found` });
}

export function errorHandler(err, req, res, next) {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message });
}
