const express = require('express');
const router = express.Router();

//Firestore initialization
const db = require('./firestore');


router.post('/', async (req,res)=>{
    console.log(req.body);
  
  let docRef = db.collection('users').doc(req.body.NIT);
  
  let setData =  await docRef.set({
    nombre: req.body.nombre,
    NIT: req.body.NIT,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.telefono,
  });
  
  var ans = db.collection('users').doc(docRef.id);
  var doc = await ans.get();
  
  var resp = doc.data();
  resp.id = docRef.id;
  console.log('devolviendo ' + resp.id);
  res.json(resp);
  
  
  });

  module.exports = router;