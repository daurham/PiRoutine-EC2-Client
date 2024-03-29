import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { get, update, post } from './controller';

dotenv.config();

const app = express();
const CLIENT = path.join(__dirname, '../../client/dist/');
const PORT = process.env.PORT || 3000;

app.use(express.static(CLIENT));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ALARM TIME
app.get('/get-alarm-time', get.alarmTime);
app.patch('/update-alarm-time', update.alarmTime);

// DISARM STATUS
app.get('/get-disarm-status', get.disarmStatus);
app.patch('/update-disarm-status', update.disarmStatus);

// STREAK COUNT
app.get('/get-streak-count', get.streakCount);
app.patch('/update-streak-count', update.streakCount);

// SKIPPED COUNT
app.get('/get-skipped-data', get.skippedData);
app.patch('/update-skipped-date', update.skipTomorrow);

// SOAKED COUNT
app.get('/get-soaked-count', get.soakedCount);

// USER INFO
app.get('/get-user-info', get.userInfo);

// DISARM RECORDS
app.get('/get-disarm-records', get.disarmRecords);
app.post('/post-disarm-record', post.disarmRecord);

app.listen(
  PORT,
  () => console.log(`Listening and running: http://localhost:${PORT}`),
);
