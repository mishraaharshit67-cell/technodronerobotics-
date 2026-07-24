import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

function parseBody(req) {
  return new Promise((resolve) => {
    const ct = req.headers['content-type'] || '';
    if (req.method === 'GET' || req.method === 'DELETE') return resolve();
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString();
      if (ct.includes('application/json')) {
        try { req.body = JSON.parse(raw); } catch { req.body = {}; }
      } else if (ct.includes('application/x-www-form-urlencoded')) {
        req.body = Object.fromEntries(new URLSearchParams(raw));
      }
      resolve();
    });
    req.on('error', () => resolve());
  });
}

const jsonResponse = (res, status, data) => {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
};

export function createApp() {
  const routes = [];
  let notFoundHandler = (req, res) => jsonResponse(res, 404, { success: false, message: `Route ${req.method} ${req.pathname} not found` });
  let errHandler = (err, req, res) => jsonResponse(res, 500, { success: false, message: err.message || 'Internal server error' });

  function addRoute(method, pattern, ...handlers) {
    const paramNames = [];
    const regexStr = pattern.replace(/:([^/]+)/g, (_, name) => { paramNames.push(name); return '([^/]+)'; });
    const regex = new RegExp(`^${regexStr}$`);
    routes.push({ method, regex, paramNames, handlers: handlers.flat() });
  }

  const handler = async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    req.pathname = url.pathname;
    req.query = Object.fromEntries(url.searchParams);
    req.body = req.body || {};

    // Express-compatible response helpers
    res.status = function (code) { this.statusCode = code; return this; };
    res.json = function (data) {
      const body = JSON.stringify(data);
      this.setHeader('Content-Type', 'application/json');
      this.end(body);
    };

    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Static files
    if (req._staticPath && !req.pathname.startsWith('/api/')) {
      const filePath = path.join(req._staticPath, req.pathname === '/' ? 'index.html' : req.pathname);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const extMap = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff' };
        const ext = path.extname(filePath).toLowerCase();
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': extMap[ext] || 'application/octet-stream', 'Content-Length': content.length });
        res.end(content);
        return;
      }
      if (!req.pathname.startsWith('/api/') && !req.pathname.includes('.')) {
        const indexPath = path.join(req._staticPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          const content = fs.readFileSync(indexPath);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
          return;
        }
      }
    }

    // Route matching
    let match = null;
    for (const r of routes) {
      if (r.method !== req.method) continue;
      const m = req.pathname.match(r.regex);
      if (m) {
        match = r;
        req.params = {};
        r.paramNames.forEach((name, i) => { req.params[name] = m[i + 1]; });
        break;
      }
    }

    if (match) {
      let idx = 0;
      const next = (err) => {
        if (err) return errHandler(err, req, res);
        idx++;
        if (idx < match.handlers.length) {
          try { match.handlers[idx](req, res, next); } catch (e) { errHandler(e, req, res); }
        }
      };
      try {
        match.handlers[0](req, res, next);
      } catch (e) { errHandler(e, req, res); }
    } else {
      notFoundHandler(req, res);
    }
  };

  const app = {
    get(pattern, ...handlers) { addRoute('GET', pattern, ...handlers); return app; },
    post(pattern, ...handlers) { addRoute('POST', pattern, ...handlers); return app; },
    put(pattern, ...handlers) { addRoute('PUT', pattern, ...handlers); return app; },
    delete(pattern, ...handlers) { addRoute('DELETE', pattern, ...handlers); return app; },
    
    use(fn) { app._middleware = app._middleware || []; app._middleware.push(fn); return app; },
    static(dir) { handler._staticPath = dir; return app; },

    setNotFoundHandler(fn) { notFoundHandler = fn; return app; },
    setErrorHandler(fn) { errHandler = fn; return app; },

    listen(port, cb) {
      const server = http.createServer(async (req, res) => {
        try {
          await parseBody(req);
          if (app._middleware) {
            let midIdx = 0;
            const runMid = () => {
              if (midIdx < app._middleware.length) {
                try { app._middleware[midIdx++](req, res, runMid); } catch (e) { errHandler(e, req, res); }
              } else {
                handler(req, res);
              }
            };
            runMid();
          } else {
            handler(req, res);
          }
        } catch (e) {
          errHandler(e, req, res);
        }
      });
      server.listen(port, cb);
      return server;
    }
  };

  return app;
}

export { jsonResponse };
