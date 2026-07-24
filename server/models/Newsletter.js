import db from '../lib/database.js';

const subscribers = () => db.collection('newsletter');

export function findByEmail(email) {
  return subscribers().findOne({ email });
}

export function findAll(query = {}) {
  return subscribers().find(query);
}

export function create(data) {
  return subscribers().insertOne(data);
}

export function updateOne(query, data) {
  return subscribers().updateOne(query, data);
}
