const mysql2 = require('mysql2');
const Promise = require('bluebird');
require('dotenv').config();

const connection = mysql2({
  user: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.USER_DATABASE,
  host: process.env.USER_HOST,
});

module.exports = connection;

// Promises