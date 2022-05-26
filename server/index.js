const express = require('express');
const path = require('path');
const ctlr = require('./controller');

const app = express();  
const PORT = process.env.USER_PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Listeners:
app.get('/api', ctlr.getData);
app.post('/api', ctlr.postData);
app.put('/api', ctlr.updateData);
app.delete('/api', ctlr.deleteData);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => console.log(`Listening to port ${PORT} -> http://localhost:${PORT}`));