var indexController = require('./controllers/index');
const express = require('express')
const app = express()
const port = 3000
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;
const {parse} = require('html-dom-parser');

//document.createElement('as', "        ");

app.use(express.static(__dirname + "/public"));
//app.set("view engine","html");
app.use('/', indexController);


app.get('/', (req, res) => res.sendfile("./public/index.html"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



