import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils.js";
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !password) {
        return handleError('Name, Email and Password all are required');
    }
    axios
      .post("http://localhost:8080/auth/signup", { name, email, password })
      .then((response) => {
        const result = response.data;
        const { success, message } = result;
        if(success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
      })
      .catch((error) => {
        const errMsg = error.response.data.error.details[0].message;
        handleError(errMsg);
      });
  };

  return (
    <div className="signUpContainer">
      <form className="signUpForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          autoFocus
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          autoFocus
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="name">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
