const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  method: { type: String, enum: ['upi', 'card'], required: true },
  upiId: String,
  card: {
    number: String,
    expiry: String,
    cvv: String
  },
  status: { type: String, default: 'Success' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
