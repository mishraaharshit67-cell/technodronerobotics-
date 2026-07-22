import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendNotification = async (contact) => {
  if (!process.env.SMTP_USER || !process.env.NOTIFICATION_EMAIL) return;
  try {
    await transporter.sendMail({
      from: `"TDR Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Contact: ${contact.name} - ${contact.subject || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${contact.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${contact.email}</td></tr>
          ${contact.phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${contact.phone}</td></tr>` : ''}
          ${contact.company ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${contact.company}</td></tr>` : ''}
          ${contact.service ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #ddd">${contact.service}</td></tr>` : ''}
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${contact.message}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date</td><td style="padding:8px;border:1px solid #ddd">${new Date(contact.createdAt).toLocaleString()}</td></tr>
        </table>
      `,
    });
  } catch (err) {
    console.error('Email notification failed:', err.message);
  }
};

export const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const { name, email, company, phone, service, message } = req.body;
    const contact = await Contact.create({ name, email, company, phone, service, message });
    sendNotification(contact);
    res.status(201).json({ success: true, message: 'Thank you! We will get back to you within 24 hours.', data: { id: contact._id } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit. Please try again later.' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
