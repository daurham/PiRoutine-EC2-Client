// const axios = require('axios');
// require('dotenv').config();
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { URL } = process.env;

// PATCH
export default {
  alarmTime: async (req, res) => {
    try {
      await axios.patch(`${URL}/update-alarm-time`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.warn('Issue updating alarm data: ', err);
      res.sendStatus(203);
    }
  },

  disarmStatus: async (req, res) => {
    try {
      await axios.patch(`${URL}/update-disarm-status`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.warn('Issue updating defuse data: ', err);
      res.sendStatus(203);
    }
  },

  streakCount: async (req, res) => {
    try {
      await axios.patch(`${URL}/update-streak-count`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.warn('Issue updating streak data: ', err);
      res.sendStatus(203);
    }
  },

  skippedData: async (req, res) => {
    try {
      await axios.patch(`${URL}/update-skipped-count`, req.body);
      res.sendStatus(203);
    } catch (err) {
      console.warn('Issue updating skipped data: ', err);
      res.sendStatus(203);
    }
  },

  skipTomorrow: async (req, res) => {
    try {
      await axios.patch(`${URL}/update-skipped-date`, req.body);
      res.sendStatus(201);
    } catch (err) {
      console.warn('Issue skipping tomorrow: ', err);
      res.sendStatus(500);
    }
  },
};
