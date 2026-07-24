import { validationResult } from '../lib/validate.js';
import * as Newsletter from '../models/Newsletter.js';

export function subscribe(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { email } = req.body;
  const existing = Newsletter.findByEmail(email);
  if (existing) {
    if (!existing.subscribed) Newsletter.updateOne({ email }, { $set: { subscribed: true } });
    return res.json({ success: true, message: 'You are already subscribed!' });
  }
  Newsletter.create({ email, subscribed: true });
  res.status(201).json({ success: true, message: 'Successfully subscribed!' });
}

export function getSubscribers(req, res, next) {
  const subs = Newsletter.findAll({ subscribed: true });
  subs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, count: subs.length, data: subs });
}

export function unsubscribe(req, res, next) {
  Newsletter.updateOne({ email: req.params.email }, { $set: { subscribed: false } });
  res.json({ success: true, message: 'Unsubscribed successfully.' });
}
