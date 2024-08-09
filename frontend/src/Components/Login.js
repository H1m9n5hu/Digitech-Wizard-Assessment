import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils.js";
import './SignUp.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) {
        return handleError('Email and Password all are required');
    }
    axios
      .post("http://localhost:8080/auth/login", { email, password })
      .then((response) => {
        const result = response.data;
        const { success, message, jwtToken, name } = result;
        if(success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate("/dashboard");
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
        <h2>Login</h2>
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

        <button type="submit">Login</button>
        <p>
          Don't Have an Account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;
