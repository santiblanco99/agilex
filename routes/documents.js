const express = require('express');
const router = express.Router();

//Firestore initialization
const db = require('./firestore');




router.get('/', async (req, res) => {

  db.collection('documents').get()
    .then((snapshot) => {
      var resp = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        var document = doc.data();
        document.id = doc.id;
        console.log(document);
        resp.push(document);
      });
      res.send(resp);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
});

router.post('/', async (req, res) => {
  try {

    let docRef = db.collection('documents').doc();
    console.log(req.body);
    let setData = await docRef.set({
      name: req.body.name,
      author: req.body.author,
      content: req.body.content,
      lastEdited: req.body.lastEdited,
      guest: req.body.guest,
      online: req.body.online
    });
    

    var ans = db.collection('documents').doc(docRef.id);
    var doc = await ans.get();

    var resp = doc.data();
    resp.id = docRef.id;
    res.json(resp);
  }
    catch (e) {
    console.log(e);
    res.status(400).send(new Error('error handling doc'));
  }



});

router.get('/:id', async function (req, res) {
  try {
    var id = req.params.id;
    console.log(id);
    var docu = db.collection('documents').doc(id);
    let getDoc = await docu.get();
    console.log('data is' + getDoc.data());
    var ans = getDoc.data();
    ans.id = getDoc.id;
    console.log('ans is ' + ans);
    res.send(ans);
  }
  catch (e) {
    console.log(e);
    res.status(400).send(new Error('error handling doc'));
  }

});


router.put('/:id', async (req, res) => {
  try {
    let newData = req.body;
    let id = req.params.id;
    let setDoc = await db.collection('documents').doc(id).set(newData);
    console.log(setDoc);
    var ans = db.collection('documents').doc(id);
    var doc = await ans.get();
    let resp = doc.data();
    resp.id = doc.id;
    res.json(resp);
  }
  catch (e) {
    console.log(e);
    res.status(400).send(new Error('error handling doc'));
  }

});

router.delete('/:id/:ida', function (req, res, next) {
  try 
  {
    console.log(req.params);
  let id = (req.params.id);
  let id2 = (req.params.ida);
  console.log("PARO"+ id +" "+id2);
  let FieldValue = require('firebase-admin').firestore.FieldValue;
  db.collection('documents').doc(id).update({
    "online": FieldValue.arrayRemove(id2)
 });
 var docu = db.collection('documents').doc(id);
 let getDoc = docu.get();
 console.log('data is' + getDoc.data());
 var ans = getDoc.data();
 ans.id = getDoc.id;
 console.log('ans is ' + ans);
 res.send(ans);
  }catch (e) {
    console.log(e);
    res.status(400).send(new Error('error handling doc'));
  }
  
  
 });

router.get('/userDocuments/:id', async (req,res)=>{
  try{
    let author = req.params.id;
    let docRef = db.collection('documents');
    let ans = [];
    let query = docRef.where('author','==',author).get()
    .then(snapshot=>{
      if(snapshot.empty){
        console.log('found no documents');
        res.send(ans);
        return;
      }
      snapshot.forEach(doc=>{
        let myDoc = doc.data();
        myDoc.id = doc.id;
        ans.push(myDoc);
      });
      res.send(ans);
    });
  }
  catch(err){
    console.log('error getting documents');
    res.status(400).send({error: err});

  }
});


module.exports = router;

