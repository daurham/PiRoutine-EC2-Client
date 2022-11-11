// const axios = require('axios');
// require('dotenv').config();
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { URL } = process.env;

// POST
export default {
  disarmRecord: async (req, res) => {
    try {
      await axios.post(`${URL}/post-disarm-record`, req.body);
      res.sendStatus(201);
    } catch (err) {
      console.warn('Issue posting disarm record: ', err);
      res.sendStatus(500);
    }
  },
};
