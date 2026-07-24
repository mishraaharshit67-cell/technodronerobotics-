import * as Job from '../models/Job.js';

export function getJobs(req, res, next) {
  const { dept, type, active } = req.query;
  let query = {};
  if (active !== 'false') query.active = true;
  if (dept) query.dept = dept;
  if (type) query.type = type;
  const all = Job.findAll(query);
  res.json({ success: true, count: all.length, data: all });
}

export function getJob(req, res, next) {
  const job = Job.findById(req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, data: job });
}

export function createJob(req, res, next) {
  const job = Job.create({ ...req.body, active: true });
  res.status(201).json({ success: true, data: job });
}

export function updateJob(req, res, next) {
  const job = Job.update(req.params.id, { $set: req.body });
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, data: job });
}

export function deleteJob(req, res, next) {
  const ok = Job.remove(req.params.id);
  if (!ok) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, message: 'Job deleted' });
}
