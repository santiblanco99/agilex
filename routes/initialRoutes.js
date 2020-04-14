const express = require('express');
const router = express.Router();

//Firestore initialization
const admin = require('firebase-admin');
let serviceAccount = require('../firebase-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();


//ROOT
router.get('/', async (req,res)=> {
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

router.get('/data', async (req,res)=>{

    db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        res.send(snapshot.docs[0]);
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
})

module.exports = router;

