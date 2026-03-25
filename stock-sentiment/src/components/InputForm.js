import React from 'react';
import './InputForm.css';

function InputForm({ stock, setStock, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="input-wrapper">
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value.toUpperCase())}
          placeholder="Enter stock name (e.g., RELIANCE, TCS, INFY)"
          required
        />
        <button type="submit">Search & Analyze</button>
      </div>
    </form>
  );
}
export default InputForm;
