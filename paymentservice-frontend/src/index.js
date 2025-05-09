import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import OrderDetails from './orderDetails';
import PaymentResult from './paymentResult';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<OrderDetails />} />
      <Route path="/result" element={<PaymentResult />} />
    </Routes>
  </Router>
);
