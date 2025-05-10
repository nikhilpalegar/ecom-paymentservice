const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Payment = require('./models/payment');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://mongo-service:27018/payment-service').then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Health check route
app.get('/', (req, res) => {
  res.send('Payment Service is up and running!');
});

// POST payment route
app.post('/api/payments', async (req, res) => {
  const { orderNumber, amount, paymentMethod, upiId, cardDetails } = req.body;

  let paymentStatus;

  // Payment simulation logic
  if (paymentMethod === "upi") {
    if (!upiId || upiId.trim() === "") {
      paymentStatus = "failure";
    } else {
      paymentStatus = simulateUPIPayment(upiId);
    }
  } else if (paymentMethod === "card") {
    if (!cardDetails?.number || !cardDetails?.expiry || !cardDetails?.cvv) {
      paymentStatus = "failure";
    } else {
      paymentStatus = simulateCardPayment(cardDetails);
    }
  } else {
    paymentStatus = "failure";
  }

  // Save payment to DB
  try {
    const payment = new Payment({
      orderNumber,
      amount,
      paymentMethod,
      upiId,
      cardDetails,
      status: paymentStatus
    });
    await payment.save();
    res.json({ status: paymentStatus });
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

// Simulate UPI payment
function simulateUPIPayment(upiId) {
  console.log(`Processing UPI payment for ${upiId}`);
  return "success";
}

// Simulate Card payment
function simulateCardPayment(cardDetails) {
  console.log(`Processing Card payment for ${cardDetails.number}`);
  return "success";
}

// Start server
app.listen(port, () => {
  console.log(`Payment Service running at http://localhost:${port}`);
});
