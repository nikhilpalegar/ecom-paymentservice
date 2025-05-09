// models/Payment.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'card'],
    required: true
  },
  upiId: {
    type: String,
    required: function () {
      return this.paymentMethod === 'upi';
    }
  },
  cardDetails: {
    number: String,
    expiry: String,
    cvv: String
  },
  status: {
    type: String,
    enum: ['success', 'failure'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
