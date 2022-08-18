const express = require('express');
const path = require('path');
const { get, update } = require('./controller');

const app = express();

const PORT = 3000;
const DIST_DIR = path.join(__dirname, '../client/dist/');

app.use(express.static(DIST_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ALARM TIME
app.get('/api/get-alarm-time', get.alarmTime);
app.patch('/update-alarm-time', update.alarmTime);

// DISARM STATUS
app.get('/api/get-disarm-status', get.disarmStatus);
app.patch('/update-disarm-status', update.disarmStatus);

// STREAK COUNT
app.get('/api/get-streak-count', get.streakCount);
app.patch('/update-streak-count', update.streakCount);

app.listen(PORT, () => console.log(`Listening and running: http://localhost:${PORT}`));
