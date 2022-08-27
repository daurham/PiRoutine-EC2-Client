const axios = require('axios');
require('dotenv').config();

const { URL } = process.env;

// GET
module.exports = {
  alarmTime: async (req, res) => {
    try {
      // console.log('alarm query', req.query);
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

  userInfo: async (req, res) => {
    try {
      // Unsecure
      // console.log('getting userData');
      const { data } = await axios.get(`${URL}/get-user-info/?table=users`);
      // console.log('got userData', data)
      res.status(200).send(data);
    } catch (err) {
      console.log('Issue getting user info data: ', err);
      res.status(200).send([{ password: '1234' }]);
    }
  },

  soakedCount: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-soaked-count/?table=soakedcount`);
      res.status(200).send(data);
    } catch (err) {
      console.log('Issue getting soakedCount data: ', err);
      res.status(200).send([{ soakedCount: 0 }]);
    }
  },

  skippedCount: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-skipped-count/?table=skippedcount`);
      res.status(200).send(data);
    } catch (err) {
      console.log('Issue getting skippedCount data: ', err);
      res.status(200).send([{ skippedCount: 0 }]);
    }
  },

  disarmRecords: async (req, res) => {
    try {
      // UserID, alarm1, alarm2, timeDisarmed1, timeDisarmed2, sucess: INT=boolean, date_
      const { data } = await axios.get(`${URL}/get-disarm-records/?table=disarmrecords`);
      res.status(200).send(data);
    } catch (err) {
      console.log('Issue getting disarmRecords data: ', err);
      res.sendStatus(500);
    }
  },
};
