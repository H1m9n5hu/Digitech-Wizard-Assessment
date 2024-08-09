import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Client.css';
import ClientFormModal from './ClientFormModal.js';
import WithdrawalModal from './WithdrawalModal.js'; // Import the withdrawal modal
import { handleError } from '../utils.js';

function Client() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClientData, setEditClientData] = useState(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:8080/client/getClients', {
        headers: {
          'Authorization': token 
        }
      });
      setClients(response.data.data);
    } catch (error) {
      console.error('Failed to fetch client data:', error);
    }
  };

  const addClient = async (clientData) => {
    try {
      const token = localStorage.getItem('token');
      if (editClientData) {
        await axios.put(`http://localhost:8080/client/editClient/${editClientData._id}`, clientData, {
          headers: {
            'Authorization': token
          }
        });
      } else {
        await axios.post('http://localhost:8080/client/addClient', clientData, {
          headers: {
            'Authorization': token
          }
        });
      }
      fetchClients(); // Refresh client list after adding or editing a client
      setEditClientData(null);
    } catch (error) {
      console.error('Failed to save client:', error);
    }
  };

  const handleCreateClick = () => {
    setEditClientData(null);  // Clear the edit data
    setIsModalOpen(true);  // Open the modal
  };

  const handleEditClick = (client) => {
    setEditClientData(client);
    setIsModalOpen(true);
  };

  const handleWithdrawClick = (client) => {
    setSelectedClient(client);
    setIsWithdrawModalOpen(true);
  };

  const handleWithdraw = async (amount) => {
    if (amount > selectedClient.expo) {
      handleError('Insufficient balance');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:8080/client/withdrawExpo/${selectedClient._id}`, 
        { amount }, 
        {
        headers: {
          'Authorization': token
        }
      });

      setIsWithdrawModalOpen(false);
      fetchClients(); // Refresh client list after withdrawal
    } catch (error) {
      console.error('Failed to process withdrawal:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="client-details">
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
              <th>Agent</th>
              <th>Contact</th>
              <th>D.O.J</th>
              <th>P.W.D</th>
              <th>EXPO</th>
              <th>Type</th>
              <th>Match</th>
              <th>SSN</th>
              <th>Chips</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client._id}>
                <td>
                  <button className="btn-row-create" onClick={() => handleEditClick(client)}>
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
                        <a href="#" onClick={() => handleWithdrawClick(client)}>Withdraw</a>
                        <a href="#">Deposit</a>
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
                <td>{client.code}</td>
                <td>{client.name}</td>
                <td>{client.agent}</td>
                <td>{client.contact}</td>
                <td>{client.doj}</td>
                <td>{client.pwd}</td>
                <td>{client.expo}</td>
                <td>{client.clientCommType}</td>
                <td>{client.clientCommMatch}</td>
                <td>{client.clientCommSSN}</td>
                <td>{client.chips}</td>
                <td>{client.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ClientFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addClient} 
        clientData={editClientData}  // Pass the client data for editing
      />
      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
        client={selectedClient}
      />
    </div>
  );
}

export default Client;
