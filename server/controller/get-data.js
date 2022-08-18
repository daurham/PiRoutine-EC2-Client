const axios = require('axios');

const URL = 'http://70.188.209.178:3000';

// GET
module.exports = {
  alarmTime: async (req, res) => {
    try {
      console.log('alarm query', req.query);
      const { data } = await axios.get(`${URL}/get-alarm-time/?table=alarmtime`);
      res.status(200).send(data);
    } catch (err) {
      console.log('Issue getting alarm data: ');
      res.status(200).send([{ hour: 6, minute: 5 }]);
    }
  },

  disarmStatus: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-disarm-status/?table=isdisarmed`);
      res.status(200).send(data);
    } catch (err) {
      console.log('Issue getting defuse data: ');
      res.status(200).send([{ isDisarmed: 0 }]);
    }
  },

  streakCount: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-streak-count/?table=streakcount`);
      res.status(200).send(data);
    } catch (err) {
      console.log('Issue getting streak data: ');

      res.status(200).send([{ streak: true }]);
    }
  },
};
