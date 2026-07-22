import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, trim: true },
  category: { type: String, required: true, enum: ['FPV Drone', 'Agricultural', 'Fire Fighting', 'Kamikaze', 'Customization'] },
  description: { type: String, required: true },
  specs: [{ type: String }],
  price: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String, default: '' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.pre('save', function (next) {
  if (!this.slug) this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  next();
});

export default mongoose.model('Product', productSchema);
