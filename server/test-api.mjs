import http from 'http';

const BASE = 'http://localhost:5000/api';
const TIMEOUT = 3000;
let passed = 0, failed = 0, skipped = 0;

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const fullUrl = BASE + path;
    const url = new URL(fullUrl);
    const opts = { method, hostname: url.hostname, port: url.port, path: url.pathname + url.search, timeout: TIMEOUT, headers: { 'Content-Type': 'application/json' } };
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(data) }); } catch { resolve({ status: res.statusCode, body: data }); } });
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: 'TIMEOUT' }); });
    req.on('error', (e) => resolve({ status: 0, body: e.message }));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function test(name, fn) {
  try { await fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (e) { failed++; console.log(`  ✗ ${name}: ${e.message}`); }
}

function expectStatus(r, expected) {
  if (r.status === 0 && r.body === 'TIMEOUT') throw new Error('TIMEOUT (MongoDB not running?)');
  if (r.status !== expected) throw new Error(`Expected ${expected} got ${r.status}`);
}
function expectKey(r, key) {
  if (!r.body || r.body[key] === undefined) throw new Error(`Expected .${key} in response`);
}

async function main() {
console.log('\n=== TDR Backend API Tests ===\n');

console.log('  [Health]');
await test('GET /api/health returns 200', async () => {
  const r = await request('GET', '/health');
  expectStatus(r, 200);
  expectKey(r, 'success');
});

console.log('\n  [Validation — no DB needed]');
await test('POST /api/contact empty body → 400', async () => {
  const r = await request('POST', '/contact', {});
  expectStatus(r, 400);
});

await test('POST /api/contact invalid email → 400', async () => {
  const r = await request('POST', '/contact', { name: 'T', email: 'bad', message: 'Hi' });
  expectStatus(r, 400);
});

await test('POST /api/newsletter empty → 400', async () => {
  const r = await request('POST', '/newsletter', {});
  expectStatus(r, 400);
});

await test('POST /api/auth/register missing fields → 400', async () => {
  const r = await request('POST', '/auth/register', {});
  expectStatus(r, 400);
});

await test('GET /api/auth/me no token → 401', async () => {
  const r = await request('GET', '/auth/me');
  expectStatus(r, 401);
});

// DB-dependent auth
for (const [name, method, path, body, expected] of [
  ['POST /api/auth/login wrong creds → 401', 'POST', '/auth/login', { email: 'x@x.com', password: 'wrong' }, 401],
]) {
  const r = await request(method, path, body);
  if (r.status === 0) { skipped++; console.log(`  - ${name} (skipped — no DB)`); }
  else { await test(name, () => { expectStatus(r, expected); }); }
}

await test('POST /api/products no token → 401', async () => {
  const r = await request('POST', '/products', { name: 'test' });
  expectStatus(r, 401);
});

await test('POST /api/upload no token → 401', async () => {
  const r = await request('POST', '/upload');
  expectStatus(r, 401);
});

// These need MongoDB — mark as info only
console.log('\n  [DB-dependent — requires MongoDB]');
for (const [name, method, path] of [
  ['GET /api/products', 'GET', '/products'],
  ['GET /api/products?category=FPV Drone', 'GET', '/products?category=FPV%20Drone'],
  ['GET /api/blog', 'GET', '/blog'],
  ['GET /api/blog?tag=AI', 'GET', '/blog?tag=AI'],
  ['GET /api/jobs', 'GET', '/jobs'],
  ['DELETE /api/newsletter/test@test.com', 'DELETE', '/newsletter/test@test.com'],
]) {
  const r = await request(method, path);
  if (r.status === 0) { skipped++; console.log(`  - ${name} (skipped — no DB)`); }
  else { await test(name, () => { expectStatus(r, 200); }); }
}

console.log(`\n${passed + failed + skipped} tests — ${passed} passed, ${failed} failed, ${skipped} skipped (no MongoDB)\n`);
process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
