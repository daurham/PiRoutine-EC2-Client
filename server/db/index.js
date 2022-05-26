const mysql2 = require('mysql2');
const Promise = require('bluebird');
require('dotenv').config();

const connection = mysql2.createConnection({
  user: process.env.USER_NAME || 'root',
  host: process.env.USER_HOST || 'localhost',
  database: process.env.USER_DATABASE || '',
  password: process.env.USER_PASSWORD || '',
});

module.exports = connection;
