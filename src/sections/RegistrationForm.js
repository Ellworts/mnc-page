// src/sections/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/main.scss';

function RegistrationForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState([]);

  const validateUsername = (username) => {
    let errors = [];
    if (username.length < 3) {
      errors.push('Username must be at least 3 characters long.');
    }
    if (/[^a-zA-Z0-9]/.test(username)) {
      errors.push('Username must contain only letters and numbers.');
    }
    return errors;
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    let errors = [];
    if (password.length < minLength) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!hasNumber.test(password)) {
      errors.push('Password must contain at least one number.');
    }
    if (!hasUpperCase.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!hasSpecialChar.test(password)) {
      errors.push('Password must contain at least one special character.');
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameErrors = validateUsername(username);
    const passwordErrors = validatePassword(password);

    if (usernameErrors.length > 0 || passwordErrors.length > 0) {
      setMessage([...usernameErrors, ...passwordErrors]);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      setMessage([response.data.message]);
      setUsername('');
      setPassword('');
      onClose();
    } catch (error) {
      setMessage([`Error: ${error.response.data.error}`]);
    }
  };

  return (
    <div className="registration-form">
      <div className="registration-header">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      {message.length > 0 && (
        <div className="message">
          <ul>
            {message.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
