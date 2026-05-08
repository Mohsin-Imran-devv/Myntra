const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  stars: { type: Number, required: true },
  count: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  company: { type: String, required: true },
  item_name: { type: String, required: true },
  original_price: { type: Number, required: true },
  current_price: { type: Number, required: true },
  discount_percentage: { type: Number },
  return_period: { type: Number },
  delivery_date: { type: String },
  rating: ratingSchema,
  category: { type: String, required: true },
  gender: { type: String },
  tags: [{ type: String }]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;