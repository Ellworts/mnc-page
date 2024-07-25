// src/sections/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/main.scss'; // Import the new SCSS file

function LoginForm({ onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      const { username: loggedInUsername, status } = response.data;
      setMessage(response.data.message);
      console.log(`Logged in as: ${loggedInUsername}, Status: ${status}`);
      onLogin(loggedInUsername, status);
      onClose();
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="login-form">
      <div className="login-header">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <div className="input-container">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="bottom"></span>
            <span className="right"></span>
            <span className="top"></span>
            <span className="left"></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="bottom"></span>
            <span className="right"></span>
            <span className="top"></span>
            <span className="left"></span>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && (
        <div className="message">
          <ul>
            <li>{message}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
