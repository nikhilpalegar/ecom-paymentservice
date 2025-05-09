import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './orderDetails.css';

function PaymentResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>No payment details found. <button onClick={() => navigate('/')}>Back</button></p>;
  }

  const { orderNumber, amount, status } = state;

  return (
    <div className="order-container">
      <h2>Payment Result</h2>
      <p><strong>Order Number:</strong> {orderNumber}</p>
      <p><strong>Amount:</strong> ₹{amount}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
}

export default PaymentResult;
