const express = require('express');
var app = express();
var documentRoutes = require('./routes/documents');
var userRoutes = require('./routes/users');
var mailRoutes = require('./routes/mail');
const cors = require('cors');
var bodyParser = require('body-parser');
const docuSignRoutes = require('./routes/docusign');
NODE_TLS_REJECT_UNAUTHORIZED=0;


app.use(cors());
app.use(bodyParser.json());

//Using routes

//Read data ex
app.use('/documents',documentRoutes);
app.use('/users',userRoutes);
app.use('/mail',mailRoutes);
app.use('/docusign',docuSignRoutes);



//Get the server running
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
app.listen(port, host);
console.log(`Your server is running on ${host}:${port}`);