import React, { useState, useEffect } from 'react';
import '../styles/main.scss';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function RegistrationForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const existingFile = localStorage.getItem('user_data');
    if (existingFile) {
      const workbook = XLSX.read(existingFile, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const existingData = XLSX.utils.sheet_to_json(worksheet);
      setUserData(existingData);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUserData = [...userData, { Username: username, Password: password }];

    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(updatedUserData);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Users');

    const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'binary' });

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('user_data', reader.result);
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
      saveAs(blob, 'user_data.xlsx');

      setMessage('Registration successful!');
      setUsername('');
      setPassword('');
      setUserData(updatedUserData);
      onClose();
    };
    reader.readAsBinaryString(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }));
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
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
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegistrationForm;
