const axios = require('axios');

const URL = 'http://70.188.209.178:3000';

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
};
