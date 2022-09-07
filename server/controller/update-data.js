const axios = require('axios');
require('dotenv').config();

const { URL } = process.env;

// PATCH
module.exports = {
  alarmTime: async (req, res) => {
    try {
      console.log(req.body);
      await axios.patch(`${URL}/update-alarm-time`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.log('Issue updating alarm data: ');
      res.sendStatus(203);
    }
  },

  disarmStatus: async (req, res) => {
    try {
      console.log(req.body);
      await axios.patch(`${URL}/update-disarm-status`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.log('Issue updating defuse data: ');
      res.sendStatus(203);
    }
  },

  streakCount: async (req, res) => {
    try {
      console.log(req.body);
      await axios.patch(`${URL}/update-streak-count`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.log('Issue updating streak data: ');
      res.sendStatus(203);
    }
  },

  skippedData: async (req, res) => {
    try {
      console.log(req.body);
      await axios.patch(`${URL}/update-skipped-count`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.log('Issue updating skipped data: ', err);
      res.sendStatus(203);
    }
  },

  skipTomorrow: async (req, res) => {
    try {
      console.log('skipping: ', req.body.data);
      // console.log('sending: ', req.body);
      await axios.patch(`${URL}/update-skipped-date`, req.body);
      res.sendStatus(201);
    } catch (err) {
      console.log('Issue skipping tomorrow: ');
      res.sendStatus(500);
    }
  },
};
