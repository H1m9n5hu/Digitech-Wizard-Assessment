import React, { useState } from 'react';
import './ClientForm.css';

const WithdrawalModal = ({ isOpen, onClose, onWithdraw, client }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onWithdraw(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Withdraw Amount</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Available EXPO: {client.expo}</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Withdraw</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalModal;
