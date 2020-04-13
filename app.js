const express = require('express');
var app = express();

//Firestore initialization
const admin = require('firebase-admin');
let serviceAccount = require('./firebase-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();








//ROOT
app.get('/', async (req,res)=> {
    //ejemplo de uso de firestore
    let docRef = db.collection('users').doc('alovelace');
    let setAda =  await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });
    console.log(setAda);

    res.send('Home page working');


});










//Get the server running
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
app.listen(port, host);
console.log(`Your server is running on ${host}:${port}`);