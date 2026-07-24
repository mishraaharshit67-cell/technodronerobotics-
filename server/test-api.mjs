import http from 'http';

const BASE = 'http://localhost:5000/api';
const TIMEOUT = 3000;
let passed = 0, failed = 0;

function request(method, path, body) {
  return new Promise((resolve) => {
    const url = new URL(BASE + path);
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
  if (r.status === 0) throw new Error(`TIMEOUT: ${r.body}`);
  if (r.status !== expected) throw new Error(`Expected ${expected} got ${r.status}`);
}

async function main() {
console.log('\n=== TDR Backend API Tests ===\n');

console.log('  [Health]');
await test('GET /api/health returns 200', async () => {
  const r = await request('GET', '/health');
  expectStatus(r, 200);
});

console.log('\n  [Validation]');
await test('POST /api/contact empty body → 400', async () => {
  const r = await request('POST', '/contact', {});
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

await test('POST /api/products no token → 401', async () => {
  const r = await request('POST', '/products', { name: 'test' });
  expectStatus(r, 401);
});

await test('POST /api/upload no token → 401', async () => {
  const r = await request('POST', '/upload');
  expectStatus(r, 401);
});

console.log('\n  [Data endpoints]');
await test('GET /api/products returns data', async () => {
  const r = await request('GET', '/products');
  expectStatus(r, 200);
  if (!r.body.success) throw new Error('Expected success');
});

await test('GET /api/blog returns data', async () => {
  const r = await request('GET', '/blog');
  expectStatus(r, 200);
});

await test('GET /api/jobs returns data', async () => {
  const r = await request('GET', '/jobs');
  expectStatus(r, 200);
});

await test('POST /api/auth/login wrong creds → 401', async () => {
  const r = await request('POST', '/auth/login', { email: 'x@x.com', password: 'wrong' });
  expectStatus(r, 401);
});

await test('DELETE /api/newsletter/test@test.com returns 200', async () => {
  const r = await request('DELETE', '/newsletter/test@test.com');
  expectStatus(r, 200);
});

console.log(`\n${passed + failed} tests — ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
