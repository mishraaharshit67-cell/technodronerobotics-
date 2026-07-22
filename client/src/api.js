import axios from 'axios';

const API = axios.create({ baseURL: '/api', timeout: 10000 });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('tdr_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchProducts = async (category) => {
  const params = category && category !== 'All' ? { category } : {};
  const { data } = await API.get('/products', { params });
  return data.data;
};

export const fetchProductBySlug = async (slug) => {
  const { data } = await API.get(`/products/slug/${slug}`);
  return data.data;
};

export const fetchBlogPosts = async (tag) => {
  const params = tag ? { tag } : {};
  const { data } = await API.get('/blog', { params });
  return data.data;
};

export const fetchJobs = async () => {
  const { data } = await API.get('/jobs');
  return data.data;
};

export const submitContact = async (formData) => {
  const { data } = await API.post('/contact', formData);
  return data;
};

export const subscribeNewsletter = async (email) => {
  const { data } = await API.post('/newsletter', { email });
  return data;
};

export default API;
