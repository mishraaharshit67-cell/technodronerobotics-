import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  dept: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
