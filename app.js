const express = require('express');
var app = express();
var routes = require('./routes/initialRoutes');


//Using routes

//Read data ex
app.use('/',routes);




//Get the server running
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
app.listen(port, host);
console.log(`Your server is running on ${host}:${port}`);