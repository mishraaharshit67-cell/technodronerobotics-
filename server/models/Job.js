import db from '../lib/database.js';

const jobs = () => db.collection('jobs');

export function findAll(query = {}) {
  return jobs().find(query);
}

export function findById(id) {
  return jobs().findById(id);
}

export function create(data) {
  return jobs().insertOne(data);
}

export function update(id, data) {
  return jobs().updateOne({ _id: id }, data);
}

export function remove(id) {
  return jobs().deleteOne({ _id: id });
}

export function count(query = {}) {
  return jobs().countDocuments(query);
}
