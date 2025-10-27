const mongoose = require('mongoose');
const PurchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qty: Number,
      priceAtPurchase: Number
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Purchase', PurchaseSchema);
