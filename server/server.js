const express = require('express');
const path = require('path');
const http = require('http');
const axios = require('axios');
// const gpio = require('onoff').Gpio;
// const logger = require('./locationLogs.js');
const app = express();
const PORT = 3000;
const DIST_DIR = path.join(__dirname, '../client/dist');

const controller = require('./controller');

app.use(express.static(DIST_DIR));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// let lox;
// app.post('/pi', (req, res) => {
//   lox = String(req.body.loc);
//   logger(String(req.body.loc), req.body.des);
//   res.sendStatus(201);
// });

const alertError = () => {
  axios.post('http://70.188.209.178:3000/piRoutine/err')
    //.then((result) => res.status(statusCode).send('Yellow LED should be on.'))
    .catch((err) => console.log('Issue triggering the yellow LED: ', err));
};

app.post('/', (req, res) => {
  //	 axios.post(`http://192.168.0.164:3000/`)
  axios.post(`http://70.188.209.178:3000/`)
    .then(() => res.status(201).send(console.log('Ayeeoooo')));
});

app.get('/alarmTime', (req, res) => {
  console.log('getting alarm data');
  //  axios.get(`http://192.168.0.164:3000/piRoutine/${'alarmtime'}`)
  axios.get(`http://70.188.209.178:3000/piRoutine/${'alarmtime'}`)
    .then((result) => { console.log('got my "/alarmTime" return data'); res.status(200).send(result.data); })
    .catch((err) => {
      console.log('Issue getting data: ', err)
      alertError();
      res.status(200).send({ hour: 6, minute: 5 });
    });
});
app.get('/streak', (req, res) => {
  // console.log('getting streak data');
  //axios.get(`http://192.168.0.164:3000/piRoutine/${'streakcount'}`)
  axios.get(`http://70.188.209.178:3000/piRoutine/${'streakcount'}`)
    .then((result) => res.status(200).send(result.data))
    .catch((err) => {
      console.log('Issue getting data: ', err)
      alertError();
      res.status(200).send({ streak: 0 });
    });
});
app.put('/updateAlarm', (req, res) => {
  // console.log('getting alarm data');
  let data = req.body;
  console.log('updating alarm: ', data);
  //  axios.put(`http://192.168.0.164:3000/piRoutine/updateAlarm/${data.oldAlarm}/${data.newAlarm}`, data)
  axios.put(`http://70.188.209.178:3000/piRoutine/updateAlarm/${data.oldAlarm}/${data.newAlarm}`, data)
    .then((result) => res.status(203).send(result.data))
    .catch((err) => {
      console.log('Issue getting data: ', err)
      alertError();
      res.status(203).send({ hour: 6, minute: 5 });
    });
});
app.put('/streak/:oldStreak/:newStreak', (req, res) => {
  console.log('updating streaks: ', req.params.oldStreak);
  // console.log('updating alarm data');
  //axios.put(`http://192.168.0.164:3000/piRoutine/updateStreak/${req.params.oldStreak}/${req.params.newStreak}/`)
  axios.put(`http://70.188.209.178:3000/piRoutine/updateStreak/${req.params.oldStreak}/${req.params.newStreak}/`)
    .then((result) => res.status(203).send(result.data))
    .catch((err) => {
      console.log('Issue getting data: ', err)
      alertError();
      res.status(203).send({ streak: 0 });
    });
});

app.post('/pi/run', (req, res) => { // run water
  console.log('reached backend server, Now requesting the Pi');
  axios.post('http://70.188.209.178:3000/piRoutine/run')
    .then((result) => res.status(201).send('Pump should have ran.'))
    .catch((err) => {
      console.log('Err running the pump: ', err)
      alertError();
      res.status(201).send('Pump had an Error. Alerting myself via yellow LED');
    });
});

app.post('/err', (req, res) => {
  console.log('sensing an err, triggering the yellow LED to tend to the code.');
  axios.post('http://70.188.209.178:3000/piRoutine/err')
    .then((result) => res.status(201).send('Yellow LED should be on.'))
    .catch((err) => console.log('Issue triggering the yellow LED: ', err));
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
