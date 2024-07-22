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
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [username, password], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Registration successful!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
