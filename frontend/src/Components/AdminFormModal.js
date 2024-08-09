import React, { useState, useEffect } from 'react';
import './ClientForm.css';

const AdminFormModal = ({ isOpen, onClose, onSave, adminData }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    admin: '',
    contact: '',
    doj: '',
    pwd: '',
    subadminMatchShr: '',
    subadminCasinoShr: '',
    subadminCommType: '',
    subadminCommMatch: '',
    subadminCommSSN: '',
    chips: '',
    status: 'Active',
  });

  // Prepopulate form fields when editing a admin
  useEffect(() => {
    if (adminData) {
      setFormData(adminData);
    } else {
      // Reset form data when no adminData is provided (i.e., when creating a new admin)
      setFormData({
        code: '',
        name: '',
        admin: '',
        contact: '',
        doj: '',
        pwd: '',
        subadminMatchShr: '',
        subadminCasinoShr: '',
        subadminCommType: '',
        subadminCommMatch: '',
        subadminCommSSN: '',
        chips: '',
        status: 'Active',
      });
    }
  }, [adminData]);

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
        <h2>{adminData ? 'Edit Admin Data' : 'Add New Admin'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} required />
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="admin" placeholder="Admin" value={formData.admin} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="tel" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required pattern="[0-9]{10}" title="Enter a valid 10-digit phone number" />
            <input type="date" name="doj" placeholder="D.O.J" value={formData.doj} onChange={handleChange} required />
            <input type="text" name="pwd" placeholder="P.W.D" value={formData.pwd} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="number" name="subadminMatchShr" placeholder="Admin Match Share" value={formData.subadminMatchShr} onChange={handleChange} required min="0" />
            <input type="number" name="subadminCasinoShr" placeholder="Admin Casino Share" value={formData.subadminCasinoShr} onChange={handleChange} required min="0" />
            <input type="text" name="subadminCommType" placeholder="Type" value={formData.subadminCommType} onChange={handleChange} required min="0" />
          </div>
          <div className="form-row">
            <input type="number" name="subadminCommMatch" placeholder="Match" value={formData.subadminCommMatch} onChange={handleChange} required min="0" />
            <input type="number" name="subadminCommSSN" placeholder="SSN" value={formData.subadminCommSSN} onChange={handleChange} required min="0" />
            <input type="number" name="chips" placeholder="Chips" value={formData.chips} onChange={handleChange} required min="0" />
          </div>
          <div className="form-row">
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

export default AdminFormModal;