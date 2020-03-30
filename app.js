
const express = require('express')
const app = express()
const port = 3000



//document.createElement('as', "        ");

app.use(express.static(__dirname + "/public"));
//app.set("view engine","html");


app.get('/', (req, res) => res.sendfile("./public/index.html"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



