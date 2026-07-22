import { validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter.js';

export const subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        await existing.save();
      }
      return res.json({ success: true, message: 'You are already subscribed!' });
    }
    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    if (error.code === 11000) return res.json({ success: true, message: 'Already subscribed!' });
    res.status(500).json({ success: false, message: 'Subscription failed. Please try again.' });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ subscribed: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.params;
    await Newsletter.findOneAndUpdate({ email }, { subscribed: false });
    res.json({ success: true, message: 'Unsubscribed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
