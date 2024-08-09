import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// import { handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';
import Client from './Client.js';
import Sidebar from './Sidebar.js';
import './Dashboard.css';
import MiniAdmin from './MiniAdmin.js';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useState("");
    // const navigate = useNavigate();

    useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, []);

    function Dashboard() {
        return <div className='welcome-msg'><h1>Welcome {loggedInUser}</h1></div>;
    }
  return (
    <div className='dashboard'>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Client />} />
            <Route path="/miniAdmins" element={<MiniAdmin />} />
          </Routes>
        </div>
    </div>
  )
}

export default Dashboard;