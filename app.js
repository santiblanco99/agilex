const express = require('express');
var app = express();
var routes = require('./routes/initialRoutes');
var userRoutes = require('./routes/users');
const cors = require('cors');
var bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

//Using routes

//Read data ex
app.use('/',routes);
app.use('/users',userRoutes);




//Get the server running
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
app.listen(port, host);
console.log(`Your server is running on ${host}:${port}`);