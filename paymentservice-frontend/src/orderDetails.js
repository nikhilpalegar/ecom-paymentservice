import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderDetails.css';

function OrderDetails() {
  const navigate = useNavigate();
  const [orderNumber] = useState("ORD123456");
  const [amount] = useState(999);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let valid = true;
    const newErrors = {};

    if (paymentMethod === "upi") {
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiRegex.test(upiId)) {
        newErrors.upiId = "Invalid UPI ID format (e.g., name@bank)";
        valid = false;
      }
    }

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(cardDetails.number)) {
        newErrors.number = "Card number must be 16 digits";
        valid = false;
      }
      if (!/^\d{3}$/.test(cardDetails.cvv)) {
        newErrors.cvv = "CVV must be 3 digits";
        valid = false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.expiry = "Expiry must be in MM/YY format";
        valid = false;
      }
    }

    setErrors(newErrors);
    setIsValid(valid);
  }, [upiId, cardDetails, paymentMethod]);

  const handlePayment = async () => {
    const res = await fetch("http://localhost:3001/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber,
        amount,
        paymentMethod: paymentMethod,
        upiId: paymentMethod === "upi" ? upiId : null,
        cardDetails: paymentMethod === "card" ? cardDetails : null
      })
    });

    const data = await res.json();
    navigate("/result", {
      state: {
        orderNumber,
        amount,
        status: data.status
      }
    });
  };

  return (
    <div className="order-container">
      <h2>Order Details</h2>
      <p><strong>Order Number:</strong> {orderNumber}</p>
      <p><strong>Amount:</strong> ₹{amount}</p>

      <label>Payment Method</label>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="upi">UPI</option>
        <option value="card">Card</option>
      </select>

      {paymentMethod === "upi" && (
        <>
          <label>UPI ID</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="e.g., name@bank"
          />
          {errors.upiId && <p className="error">{errors.upiId}</p>}
        </>
      )}

      {paymentMethod === "card" && (
        <>
          <label>Card Number</label>
          <input
            type="text"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            placeholder="16-digit card number"
          />
          {errors.number && <p className="error">{errors.number}</p>}

          <label>Expiry (MM/YY)</label>
          <input
            type="text"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            placeholder="MM/YY"
          />
          {errors.expiry && <p className="error">{errors.expiry}</p>}

          <label>CVV</label>
          <input
            type="text"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            placeholder="3-digit CVV"
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </>
      )}

      <button onClick={handlePayment} disabled={!isValid}>
        Pay Now
      </button>
    </div>
  );
}

export default OrderDetails;
