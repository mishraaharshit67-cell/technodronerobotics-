import db from '../lib/database.js';

const products = () => db.collection('products');

export function findAll(query = {}) {
  return products().find(query);
}

export function findById(id) {
  return products().findById(id);
}

export function findBySlug(slug) {
  return products().findOne({ slug });
}

export function create(data) {
  return products().insertOne(data);
}

export function update(id, data) {
  return products().updateOne({ _id: id }, data);
}

export function remove(id) {
  return products().deleteOne({ _id: id });
}

export function count(query = {}) {
  return products().countDocuments(query);
}
