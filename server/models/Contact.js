import db from '../lib/database.js';

const contacts = () => db.collection('contacts');

export function findAll(query = {}) {
  return contacts().find(query);
}

export function create(data) {
  return contacts().insertOne(data);
}
