// Starts the server

const express = require('express')
const app = express();
const controller = require('./controller');
const port = 8080;

controller(app);

app.listen(port, () => {
    console.log('App listening on port '+port+'!')
});