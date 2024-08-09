import React, { useState, useEffect } from 'react';
import './ClientForm.css';

const ClientFormModal = ({ isOpen, onClose, onSave, clientData }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    agent: '',
    contact: '',
    doj: '',
    pwd: '',
    expo: '',
    clientCommType: '',
    clientCommMatch: '',
    clientCommSSN: '',
    chips: '',
    status: 'Active',
  });

  // Prepopulate form fields when editing a client
  useEffect(() => {
    if (clientData) {
      setFormData(clientData);
    } else {
      // Reset form data when no adminData is provided (i.e., when creating a new admin)
      setFormData({
        code: '',
        name: '',
        agent: '',
        contact: '',
        doj: '',
        pwd: '',
        expo: '',
        clientCommType: '',
        clientCommMatch: '',
        clientCommSSN: '',
        chips: '',
        status: 'Active',
      });
    }
  }, [clientData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{clientData ? 'Edit Client Data' : 'Add New Client'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} required />
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="agent" placeholder="Agent" value={formData.agent} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="tel" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required pattern="[0-9]{10}" title="Enter a valid 10-digit phone number" />
            <input type="date" name="doj" placeholder="D.O.J" value={formData.doj} onChange={handleChange} required />
            <input type="text" name="pwd" placeholder="P.W.D" value={formData.pwd} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="number" name="expo" placeholder="EXPO" value={formData.expo} onChange={handleChange} required min="0" />
            <input type="text" name="clientCommType" placeholder="Type" value={formData.clientCommType} onChange={handleChange} required min="0" />
            <input type="number" name="clientCommMatch" placeholder="Match" value={formData.clientCommMatch} onChange={handleChange} required min="0" />
          </div>
          <div className="form-row">
            <input type="number" name="clientCommSSN" placeholder="SSN" value={formData.clientCommSSN} onChange={handleChange} required min="0" />
            <input type="number" name="chips" placeholder="Chips" value={formData.chips} onChange={handleChange} required min="0" />
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientFormModal;