const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  sold: { type: Number, default: 0 }
});
module.exports = mongoose.model('Product', ProductSchema);
