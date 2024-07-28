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

app.post('/reviews', (req, res) => {
  const { username, review } = req.body;
  const date = new Date().toLocaleString();
  const query = `INSERT INTO reviews (username, review, date) VALUES (?, ?, ?)`;
  db.run(query, [username, review, date], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Review added successfully!' });
  });
});

app.get('/reviews', (req, res) => {
  const query = `SELECT id, username, review, date FROM reviews`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.delete('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM reviews WHERE id = ?`;
  db.run(query, [id], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Review deleted successfully!' });
  });
});

app.delete('/deleteAccount', (req, res) => {
  console.log('Received DELETE request for account deletion');
  const { username } = req.body;
  console.log(`Username to delete: ${username}`);
  const query = `DELETE FROM users WHERE username = ?`;
  db.run(query, [username], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Account deleted successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
