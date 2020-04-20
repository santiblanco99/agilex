const express = require('express');
const router = express.Router();

//Firestore initialization
const db = require('./firestore');


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

router.get('/documents', async (req,res)=>{

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

router.post('/documents', async (req,res)=>{
  console.log(req.body);

let docRef = db.collection('documents').doc();

let setData =  await docRef.set({
  name: req.body.name,
  author: req.body.author,
  content: req.body.content,
});

var ans = db.collection('documents').doc(docRef.id);
var doc = await ans.get();

var resp = doc.data();
resp.id = docRef.id;
res.json(resp);


});

router.get('/documents/:id',  async function(req,res){
  var id = req.params.id;
  console.log(id);
  var docu = db.collection('documents').doc(id);
  let getDoc = await docu.get(); 
  console.log('data is' + getDoc.data());
  var ans = getDoc.data();
  ans.id = getDoc.id;
  console.log('ans is ' + ans);
  res.send(ans);
});

module.exports = router;

