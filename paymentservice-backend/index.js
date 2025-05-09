const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware setup
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Allow cross-origin requests from your frontend

// Sample route for checking the backend server status
app.get('/', (req, res) => {
  res.send('Payment Service is up and running!');
});

// Simulate a payment processing API
app.post('/api/payments', (req, res) => {
  const { orderNumber, amount, paymentMethod, upiId, cardDetails } = req.body;

  let paymentStatus;

  // Payment logic based on the payment method
  if (paymentMethod === "upi") {
    if (!upiId || upiId.trim() === "") {
      paymentStatus = "failure"; // Failure due to invalid UPI ID
    } else {
      // Simulate UPI payment success
      paymentStatus = simulateUPIPayment(upiId);
    }
  } else if (paymentMethod === "card") {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
      paymentStatus = "failure"; // Failure due to invalid card details
    } else {
      // Simulate Card payment success
      paymentStatus = simulateCardPayment(cardDetails);
    }
  } else {
    paymentStatus = "failure"; // Failure if no payment method selected
  }

  // Respond with payment status
  res.json({ status: paymentStatus });
});

// Simulate UPI payment (returns "success" if UPI ID is valid)
function simulateUPIPayment(upiId) {
  // In a real-world scenario, you'd integrate with a UPI API (e.g., Razorpay, Paytm)
  console.log(`Processing UPI payment for UPI ID: ${upiId}`);
  
  // Simulate successful transaction
  return "success";
}

// Simulate Card payment (returns "success" if card details are valid)
function simulateCardPayment(cardDetails) {
  // In a real-world scenario, you'd integrate with a payment gateway (e.g., Stripe, Razorpay)
  console.log(`Processing Card payment for Card Number: ${cardDetails.number}`);
  
  // Simulate successful transaction
  return "success";
}

// Start the server
app.listen(port, () => {
  console.log(`Payment Service is running on http://localhost:${port}`);
});
