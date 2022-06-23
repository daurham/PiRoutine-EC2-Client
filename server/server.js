const express = require('express');
const path = require('path');
const http = require('http');
const axios = require('axios');
const controller = require('./controller');

const app = express();
const PORT = 3000;
const DIST_DIR = path.join(__dirname, '../client/dist');


app.use(express.static(DIST_DIR));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const alertError = () => console.log(`ERROR DETECTED @`, new Date().toISOString().replace('T', ' '));

app.get('/alarmTime', async (req, res) => {
  try {
    let result = await axios.get(`http://70.188.209.178:3000/piRoutine/${'alarmtime'}`);
    res.status(200).send(result.data);
    // console.log('got my "/alarmTime" return data', result.data);
  } catch (err) {
    // console.log('Issue getting alarm data: ', err)
    alertError();
    res.status(200).send({ hour: 6, minute: 5 });
  };
});



app.get('/streak', async (req, res) => {
  try {
    let result = await axios.get(`http://70.188.209.178:3000/piRoutine/${'streakcount'}`);
    res.status(200).send(result.data);
    // console.log('getting streak data');
  } catch (err) {
    // console.log('Issue getting streak data: ', err)
    alertError();
    res.status(200).send({ streak: 0 });
  };
});

app.put('/defused/:newVal', async (req, res) => {
  try {
    await axios.put(`http://70.188.209.178:3000/piRoutine/updateDefusal/${req.params.newVal}`);
    res.sendStatus(203);
  } catch (err) {
    alertError();
    res.status(200).send({ streak: 0 });
  };
});

app.put('/updateAlarm/:hour/:minute/:tod', async (req, res) => {
  try {
    console.log(req.params);
    let result = await axios.put(`http://70.188.209.178:3000/piRoutine/updateAlarm/${req.params.hour}/${req.params.minute}/${req.params.tod}`);
    res.sendStatus(203);
  } catch (err) {
    alertError();
    console.log('Issue updating alarm data: ', err)
    res.status(203).send({ hour: 6, minute: 5, tod: 'AM' }); // remove this when refactoring... Time must match db / backend
  }
});

app.put('/streak/:newStreak', async (req, res) => {
  try {
    console.log('updating streaks: ', req.params.newStreak);
    let result = await axios.put(`http://70.188.209.178:3000/piRoutine/updateStreak/${req.params.newStreak}/`);
    res.status(203).send(result.data);
    // console.log('updating alarm data');
  } catch (err) {
    // console.log('Issue updating streak data: ', err)
    alertError();
    res.status(203).send({ streak: 0 });
  };
});

app.post('/pi/run', async (req, res) => { // run water
  try {
    let result = await axios.post('http://70.188.209.178:3000/piRoutine/run');
    res.status(201).send('Pump should have ran.');
    // console.log('reached backend server, Now requesting the Pi');
  } catch (err) {
    alertError();
    res.status(201).send('Pump had an Error');
  };
});

app.post('/err', async (req, res) => {
  // console.log('sensing an err, triggering the yellow LED to tend to the code.');
  try {
    await axios.post('http://70.188.209.178:3000/piRoutine/err');
    res.status(201).send('Yellow LED should be on.');
  } catch (err) {
    console.error('Issue triggering the yellow LED: ', err);
    res.status(201).send('ERR: ', err);
  };
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
