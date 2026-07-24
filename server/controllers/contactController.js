import { validationResult } from '../lib/validate.js';
import { sendEmail } from '../lib/mail.js';
import * as Contact from '../models/Contact.js';

export function submitContact(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { name, email, company, phone, service, message } = req.body;
  const contact = Contact.create({ name, email, company, phone, service, message });
  sendEmail({
    to: process.env.NOTIFICATION_EMAIL || email,
    subject: `New Contact: ${name} - ${service || 'General Inquiry'}`,
    html: `<h2>New Contact</h2><p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  }).catch(() => {});
  res.status(201).json({ success: true, message: 'Thank you! We will get back to you within 24 hours.' });
}

export function getContacts(req, res, next) {
  const all = Contact.findAll();
  all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, count: all.length, data: all });
}
