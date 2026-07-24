import db from '../lib/database.js';

const posts = () => db.collection('blogPosts');

export function findAll(query = {}) {
  return posts().find(query);
}

export function findBySlug(slug) {
  return posts().findOne({ slug });
}

export function findById(id) {
  return posts().findById(id);
}

export function create(data) {
  return posts().insertOne(data);
}

export function update(id, data) {
  return posts().updateOne({ _id: id }, data);
}

export function remove(id) {
  return posts().deleteOne({ _id: id });
}

export function count(query = {}) {
  return posts().countDocuments(query);
}
