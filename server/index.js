const express = require('express');
const path = require('path');
const controller = require('./controller');
require('dotenv').config();

const app = express();
const PORT = process.env.USER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Listeners:
app.get('/track/', ctlr.getData);
app.post('/track/', ctlr.postData);
app.put('/track/', ctlr.updateData);
app.delete('/track/', ctlr.deleteData);

app.use(express.static(path.join(__dirname, 'client/src')));

app.listen(PORT, () => console.log('Listening to port ' + PORT));