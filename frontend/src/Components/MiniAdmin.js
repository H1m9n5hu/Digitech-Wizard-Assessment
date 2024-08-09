import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './MiniAdmin.css';
import AdminFormModal from './AdminFormModal.js';

function MiniAdmin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAdminData, setEditAdminData] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('https://digitech-wizard-api.vercel.app/miniAdmin/getMiniAdmins', {
        headers: {
          'Authorization': token 
        }
      });
      setAdmins(response.data.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  const miniAdmin = async (adminData) => {
    try {
      const token = localStorage.getItem('token');
      if (editAdminData) {
        await axios.put(`https://digitech-wizard-api.vercel.app/miniAdmin/editMiniAdmin/${editAdminData._id}`, adminData, {
          headers: {
            'Authorization': token
          }
        });
      } else {
        await axios.post('https://digitech-wizard-api.vercel.app/miniAdmin/addMiniAdmin', adminData, {
          headers: {
            'Authorization': token
          }
        });
      }
      fetchAdmin(); 
      setEditAdminData(null);
    } catch (error) {
      console.error('Failed to save admin:', error);
    }
  };

  const handleCreateClick = () => {
    setEditAdminData(null);  // Clear the edit data
    setIsModalOpen(true);  // Open the modal
  };

  const handleEditClick = (admin) => {
    setEditAdminData(admin);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <div className="mini-admin-details">
      <div className="header">
        <button className="btn-create" onClick={handleCreateClick}>
          <FontAwesomeIcon className='right-margin' icon={faPlus} /> Create
        </button>
        <button className="btn-update">Update Limit</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Code</th>
              <th>Name</th>
              <th>Admin</th>
              <th>Contact</th>
              <th>D.O.J</th>
              <th>P.W.D</th>
              <th>Match Shr</th>
              <th>Casino Shr</th>
              <th>Type</th>
              <th>Match</th>
              <th>SSN</th>
              <th>Chips</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>
                  <button className="btn-row-create" onClick={() => handleEditClick(admin)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td className="row-buttons">
                  <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    {dropdownOpen && (
                      <div className="dropdown-menu">
                        <a href="#">Deposit</a>
                        <a href="#">Withdraw</a>
                        <a href="#">Inactive</a>
                        <a href="#">Block Betting</a>
                        <a href="#">Block Casino</a>
                        <a href="#">Edit</a>
                        <a href="#">Statement</a>
                        <a href="#">Account Operations</a>
                        <a href="#">Login Report</a>
                        <a href="#">Send Login Details</a>
                      </div>
                    )}
                  </div>
                </td>
                <td>{admin.code}</td>
                <td>{admin.name}</td>
                <td>{admin.admin}</td>
                <td>{admin.contact}</td>
                <td>{admin.doj}</td>
                <td>{admin.pwd}</td>
                <td>{admin.subadminMatchShr}</td>
                <td>{admin.subadminCasinoShr}</td>
                <td>{admin.subadminCommType}</td>
                <td>{admin.subadminCommMatch}</td>
                <td>{admin.subadminCommSSN}</td>
                <td>{admin.chips}</td>
                <td>{admin.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={miniAdmin} 
        adminData={editAdminData}  // Pass the client data for editing
      />
    </div>
  );
}

export default MiniAdmin;
