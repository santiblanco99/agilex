const express = require('express');
const router = express.Router();

//Firestore initialization
const db = require('./firestore');


router.post('/', async (req,res)=>{
    console.log(req.body);
  
  let docRef = db.collection('users').doc(req.body.email);
  
  let setData =  await docRef.set({
    nombre: req.body.nombre,
    NIT: req.body.NIT,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email,
  });
  
  var ans = db.collection('users').doc(docRef.id);
  var doc = await ans.get();
  
  var resp = doc.data();
  resp.id = docRef.id;
  console.log('devolviendo ' + resp.id);
  res.json(resp);
  
  
  });

  router.get('/:id',  async function(req,res){
    var id = req.params.id;
    console.log(id);
    var docu = db.collection('users').doc(id);
    let getDoc = await docu.get(); 
    console.log('data is' + getDoc.data());
    var ans = getDoc.data();
    ans.id = getDoc.id;
    console.log('ans is ' + ans);
    res.send(ans);
  });

  module.exports = router;