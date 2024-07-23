// src/user-registration/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const status = "User";
  const registeredDate = new Date().toLocaleString();
  const query = `INSERT INTO users (username, password, status, registered_date) VALUES (?, ?, ?, ?)`;
  db.run(query, [username, password, status, registeredDate], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Registration successful!' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT username, status FROM users WHERE username = ? AND password = ?`;
  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      const lastLoggedIn = new Date().toLocaleString();
      const updateQuery = `UPDATE users SET last_logged_in = ? WHERE username = ?`;
      db.run(updateQuery, [lastLoggedIn, username], (updateErr) => {
        if (updateErr) {
          return res.status(400).json({ error: updateErr.message });
        }
        res.json({ message: 'Login successful!', username: row.username, status: row.status });
      });
    } else {
      res.status(400).json({ error: 'Invalid username or password' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
