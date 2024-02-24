const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Configure MySQL connection
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err);
  } else {
    console.log('Connected...!');
  }
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

app.post('/update_users', (req, res) => {
  const { name, email, phone, address, company, message } = req.body;
  // Correct query for updating an existing row:
  const query = `INSERT INTO users (name, email, phone, address, company, message) VALUES ("${name}", "${email}", "${phone}", "${address}", "${company}", "${message}")`

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error updating table: ' + err.stack);
      res.status(500).send('Error updating table');
      return;
    }
    res.send('Table updated successfully');
    console.log("result", result);
  });
});
