const axios = require('axios');
require('dotenv').config();

const { URL } = process.env;

// POST
module.exports = {
  disarmRecord: async (req, res) => {
    try {
      // username, alarm1, alarm2, timeDisarmed1, timeDisarmed2, sucess: INT==boolean,
      console.log('disarm data', req.body);
      await axios.post(`${URL}/post-disarm-record`, req.body);
      res.sendStatus(201);
    } catch (err) {
      console.log('Issue posting disarm record: ', err);
      res.sendStatus(500);
    }
  },
  skipTomorrow: async (req, res) => {
    try {
      console.log('skipping: ', req.body.date);
      // console.log('sending: ', req.body);
      await axios.post(`${URL}/post-skip`, req.body);
      res.sendStatus(201);
    } catch (err) {
      console.log('Issue skipping tomorrow: ');
      res.sendStatus(500);
    }
  },
};