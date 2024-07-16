// RegistrationForm.js
import React, { useState } from 'react';
import './RegistrationForm.scss';

function RegistrationForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving the data
    console.log(`Username: ${username}, Password: ${password}`);
    setMessage('Registration successful!');
    // Clear the form
    setUsername('');
    setPassword('');
    // Optionally close the registration form upon successful registration
    onClose();
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
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegistrationForm;
