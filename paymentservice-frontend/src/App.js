import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Payment Service</h1>
      <Link to="/order">Go to Order Details</Link>
    </div>
  );
}

export default App;
