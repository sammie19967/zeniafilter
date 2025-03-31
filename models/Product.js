// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  location: {
    county: String,
    city: String
  },
  category: String,
  brand: String,
  model: String,
  listingType: { type: String, enum: ['sale', 'hire'] },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for better query performance
ProductSchema.index({ price: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ "location.county": 1 });

// Check if the model is already defined to prevent errors during hot reloading
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;