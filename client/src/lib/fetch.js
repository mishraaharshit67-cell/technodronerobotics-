const BASE = '/api';
const TOKEN_KEY = 'tdr_token';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(method, path, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  const token = getToken();
  if (token) opts.headers.Authorization = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(BASE + path, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const API = { get: (p) => request('GET', p), post: (p, b) => request('POST', p, b), put: (p, b) => request('PUT', p, b), del: (p) => request('DELETE', p) };

export const fetchProducts = async (category) => {
  const params = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  const data = await request('GET', `/products${params}`);
  return data.data;
};

export const fetchProductBySlug = async (slug) => {
  const data = await request('GET', `/products/slug/${slug}`);
  return data.data;
};

export const fetchBlogPosts = async (tag) => {
  const params = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  const data = await request('GET', `/blog${params}`);
  return data.data;
};

export const fetchJobs = async () => {
  const data = await request('GET', '/jobs');
  return data.data;
};

export const submitContact = async (formData) => {
  return request('POST', '/contact', formData);
};

export const subscribeNewsletter = async (email) => {
  return request('POST', '/newsletter', { email });
};

export { setToken, getToken };
export default API;
