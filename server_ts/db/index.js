require('dotenv').config();

const {
  USER_NAME,
  USER_HOST,
  USER_DATABASE,
  USER_PASSWORD
} = process.env;

//* MongoDB
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${USER_HOST || 'localhost'}:27017/${USER_DATABASE || 'test'}`, () => {
  console.log('Connected to MongoDB');
});

const mySchema = mongoose.Schema({});
const Doc = mongoose.model('doc', mySchema);

module.exports = { Doc, mongoose };

// */
/* MySQL
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
  user: USER_NAME || 'root',
  host: USER_HOST || 'localhost',
  database: USER_DATABASE || 'test',
  password: USER_PASSWORD || '',
});

module.exports = connection;

// */
/* PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
  user: USER_NAME || 'root',
  host: USER_HOST || 'localhost',
  database: USER_DATABASE || 'test',
  port: 5432,
  password: USER_PASSWORD || '',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

 module.exports = pool;

//*/