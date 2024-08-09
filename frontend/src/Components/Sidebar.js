import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils.js";
import { ToastContainer } from "react-toastify";
import {
  faTachometerAlt,
  faUserShield,
  faFileInvoiceDollar,
  faChartLine,
  faCog,
  faFileAlt,
  faMoneyBillWave,
  faChevronDown,
  faChevronUp,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [adminOpen, setAdminOpen] = useState(false);

  const toggleAdmin = () => {
    setAdminOpen(!adminOpen);
  };

  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleMiniAdmin = () => {
    navigate("/miniAdmins");
  };
  const handleClient = () => {
    navigate("/clients");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={handleDashboard}>
          <FontAwesomeIcon className="right-margin" icon={faTachometerAlt} /> Dashboard
        </li>
        <li onClick={toggleAdmin}>
          <span className="menu-item">
            <FontAwesomeIcon className="right-margin" icon={faUserShield} />{" "}
            Admin Details
            <FontAwesomeIcon
              icon={adminOpen ? faChevronUp : faChevronDown}
              className="dropdown-icon"
            />
          </span>
        </li>
        {adminOpen && (
          <ul className="submenu">
            <li onClick={handleMiniAdmin}>
              MiniAdmin Master
            </li>
            <li>Master Master</li>
            <li>Super Agent Master</li>
            <li>Agent Master</li>
            <li onClick={handleClient}>
              Client Master
            </li>
          </ul>
        )}
        <li>
          <FontAwesomeIcon className="right-margin" icon={faChartLine} />{" "}
          Sports-Betting
        </li>
        <li>
          <FontAwesomeIcon
            className="right-margin"
            icon={faFileInvoiceDollar}
          />{" "}
          Ledger
        </li>
        <li>
          <FontAwesomeIcon className="right-margin" icon={faMoneyBillWave} />{" "}
          Cash Transaction
        </li>
        <li>
          <FontAwesomeIcon className="right-margin" icon={faFileAlt} /> Report
        </li>
        <li>
          <FontAwesomeIcon className="right-margin" icon={faCog} /> WBT Settings
        </li>
        <li onClick={handleLogout}>
          <FontAwesomeIcon className="right-margin" icon={faSignOutAlt} /> Logout
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
