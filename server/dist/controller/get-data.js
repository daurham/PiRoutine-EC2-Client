const axios = require('axios');
require('dotenv').config();

const { URL } = process.env;

// GET
module.exports = {
  alarmTime: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-alarm-time/?table=alarmtime`);
      res.status(200).send(data);
    } catch (err) {
      console.warn('Issue getting alarm data: ', err);
      res.status(200).send([{ hour: 6, minute: 5 }]);
    }
  },

  disarmStatus: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-disarm-status/?table=isdisarmed`);
      res.status(200).send(data);
    } catch (err) {
      console.warn('Issue getting defuse data: ', err);
      res.status(200).send([{ isDisarmed: 0 }]);
    }
  },

  streakCount: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-streak-count/?table=streakcount`);
      res.status(200).send(data);
    } catch (err) {
      console.warn('Issue getting streak data: ', err);
      res.status(200).send([{ streak: true }]);
    }
  },

  userInfo: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-user-info/?table=users`);
      res.status(200).send(data);
    } catch (err) {
      console.warn('Issue getting user info data: ', err);
      res.status(200).send([{ password: '1234' }]);
    }
  },

  soakedCount: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-soaked-count/?table=soakedcount`);
      res.status(200).send(data);
    } catch (err) {
      console.warn('Issue getting soakedCount data: ', err);
      res.status(200).send([{ soakedCount: 0 }]);
    }
  },

  skippedData: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-skipped-data/?table=skippedcount`);
      res.status(200).send(data);
    } catch (err) {
      console.warn('Issue getting skippedCount data: ', err);
      res.status(200).send([{ skippedCount: 0 }]);
    }
  },

  disarmRecords: async (req, res) => {
    try {
      const { data } = await axios.get(`${URL}/get-disarm-records/?table=disarmrecords`);
      res.status(200).send(data);
    } catch (err) {
      console.warn('Issue getting disarmRecords data: ', err);
      res.sendStatus(500);
    }
  },
};
