// src/user-registration/Create_db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/user-registration/users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            status TEXT NOT NULL,
            registered_date TEXT NOT NULL,
            last_logged_in TEXT
          )`);
  console.log('Users table created or already exists.');
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});
