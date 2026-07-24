const defaults = {
  origin: '*',
  credentials: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

export function createCors(opts = {}) {
  const config = { ...defaults, ...opts };
  const origins = Array.isArray(config.origin) ? config.origin : [config.origin];
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origins.includes('*') || origins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }
    if (config.credentials) res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', config.methods);
    res.setHeader('Access-Control-Allow-Headers', config.allowedHeaders);
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    next();
  };
}
