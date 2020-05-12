const express = require('express');
const router = express.Router();

//Firestore initialization
const db = require('./firestore');


function randomString() {
	return Math.floor(Math.random() * Math.pow(2, 52)).toString(32);
}

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
    let yo = req.body.content+"";
    console.log(yo);
    //Convertir de suggestion a commet
    var n = yo.indexOf('<suggestion id="');
    var size = '<suggestion id="';
    size = size.length;
    
    while (n != -1) {
      var hasta = yo.indexOf(':', n);
      var inte = yo.indexOf(' type="',n);
      var typeE = yo.substring(inte,yo.indexOf ('"',inte+'type="'.length+1)+1 );
      while (typeE != ' type="start"'  && n != -1)
      {
        console.log("BUEN"+typeE)
        var n = yo.indexOf('<suggestion id="', n + size);
        hasta = yo.indexOf(':', n);
        inte = yo.indexOf(' type="',n);
        typeE = yo.substring(inte,yo.indexOf ('"',inte+' type="'.length+1)+1 );
      }
      if (n == -1)
        break;
      var id = yo.substring(n + size, hasta);
      var hasta_id = yo.indexOf('"', hasta);
      var idUser = yo.substring(hasta + 1, hasta_id);
      //quitar el id user
      yo = yo.substring(0, hasta) +
        yo.substring(hasta_id);

      var desde_type = yo.indexOf('"', hasta + 1);
      var type = yo.substring(desde_type + 1, yo.indexOf('"', desde_type + 1));

      //mensage
      var message;
      if (type == "insertion") {
      console.log(yo);
        dentro =yo.substring(yo.indexOf("n>", hasta + 1) + 2, yo.indexOf('<suggestion id="'+id, hasta + 1));
         console.log("HOLI! "+dentro);
        var j = dentro.indexOf('<');
        while (j!=-1)
        {
          dentro = dentro.substring(0,j)+ dentro.substring(dentro.indexOf('>')+1);
         
          var j = dentro.indexOf('<');
        }
        message = "<p> insertó " + dentro + " </p>";
        console.log(message);
      } else {
        dentro =yo.substring(yo.indexOf("n>", hasta + 1) + 2, yo.indexOf('<suggestion id="'+id, hasta + 1));
         console.log("HOLI! "+dentro);
        var j = dentro.indexOf('<');
        while (j!=-1)
        {
          dentro = dentro.substring(0,j)+ dentro.substring(dentro.indexOf('>')+1);
         
          var j = dentro.indexOf('<');
        }
        message = "<p> eliminó " + dentro + " </p>";
        console.log(message);
      }

      //suggestion end 
      var n_otro = yo.indexOf('<suggestion id="'+id, n + size);
      var hasta_otro = yo.indexOf(':', n_otro);
      var id_ptrp_otro = yo.substring(n_otro + size, hasta_otro);
      var hasta_id_otro = yo.indexOf('"', hasta_otro);
      var idUser = yo.substring(hasta_otro + 1, hasta_id_otro);
      yo = yo.substring(0, hasta_otro) +
        yo.substring(hasta_id_otro);

      //Siguiente suggestion
      var n = yo.indexOf('<suggestion id="', n + size);

      console.log(id);
      console.log(idUser);
      console.log(type);
      //console.log(message);
      console.log(yo);

      //Buscar la fecha
      var fecha;
      for (const v of req.body.trackChanges)
      {
        console.log(v);
        if (v.id === id)
        {
          fecha = v.createdAt;
        }

      }

      //Crear y agregar comentario
      var comentario ={
        authorId: idUser,
        commentId: randomString(),
        content: message,
        createdAt: fecha
      };
      let ya=true;
      for (const v of req.body.commets)
      {
        console.log (v);
        if (v["threadId"]===id)
        {
          v["comments"].push(comentario);
          ya=false;
        }
      }
      if (ya)
      {
        req.body.commets.push(
          {
            threadId: id,
            comments: comentario
          }
        )
      }
      
    //  req.body.commets.id.comments.push(comentario);
      // break;
    }

    yo = yo.split("suggestion").join("comment");
  
    yo = yo.split('comment-type="insertion"  type="start"')
    .join('style="background:var(--ck-color-suggestion-marker-insertion-background);"');
 
    yo = yo.split('comment-type="deletion" type="start"')
    .join( 'style="background:var(--ck-color-suggestion-marker-deletion-background);"> <s');
    yo = yo.split('comment-type="deletion" type="end">').join("></s>");
    yo = yo.split('comment-type="insertion"').join("");
    console.log(yo);
    req.body.content= yo;
    req.body.trackChanges= [];
    console.log(req.body);
    let setData = await docRef.set({
      name: req.body.name,
      author: req.body.author,
      content: req.body.content,
      lastEdited: req.body.lastEdited,
      guest: req.body.guest,
      online: req.body.online,
      trackChanges: req.body.trackChanges,
      commets: req.body.commets,
      shared: req.body.shared
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


//route to get shared documents
router.get('/shared/:id',(req,res)=>{
  let id = req.params.id;
  db.collection('documents').get()
  .then((snapshot) => {
    var resp = [];
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      var document = doc.data();
      document.id = doc.id;
      let shared = document.shared;
      shared.forEach(element =>{
        if(element == id){
          resp.push(document);
        }
      });
    });
    res.send(resp);
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

});


router.put('/:id', async (req, res) => {
  try {
    let newData = req.body;
    let id_este = req.params.id;
    let yo = req.body.content+"";

    var n = yo.indexOf('<suggestion id="');
    var size = '<suggestion id="';
    size = size.length;
    console.log("JA"+yo);
    while (n != -1) {
      var hasta = yo.indexOf(':', n);
      var inte = yo.indexOf(' type="',n);
      var typeE = yo.substring(inte,yo.indexOf ('"',inte+'type="'.length+1)+1 );
      while (typeE != ' type="start"'  && n != -1)
      {
        console.log("BUEN"+typeE)
        var n = yo.indexOf('<suggestion id="', n + size);
        hasta = yo.indexOf(':', n);
        inte = yo.indexOf(' type="',n);
        typeE = yo.substring(inte,yo.indexOf ('"',inte+' type="'.length+1)+1 );
      }
      if (n == -1)
        break;
      var id = yo.substring(n + size, hasta);
      var hasta_id = yo.indexOf('"', hasta);
      var idUser = yo.substring(hasta + 1, hasta_id);
      //quitar el id user
      yo = yo.substring(0, hasta) +
        yo.substring(hasta_id);

      var desde_type = yo.indexOf('"', hasta + 1);
      var type = yo.substring(desde_type + 1, yo.indexOf('"', desde_type + 1));

      //mensage
      var message;
      if (type == "insertion") {
      console.log(yo);
        dentro =yo.substring(yo.indexOf("n>", hasta + 1) + 2, yo.indexOf('<suggestion id="'+id, hasta + 1));
         console.log("HOLI! "+dentro);
        var j = dentro.indexOf('<');
        while (j!=-1)
        {
          dentro = dentro.substring(0,j)+ dentro.substring(dentro.indexOf('>')+1);
         
          var j = dentro.indexOf('<');
        }
        message = "<p> insertó " + dentro + " </p>";
        console.log(message);
      } else {
        dentro =yo.substring(yo.indexOf("n>", hasta + 1) + 2, yo.indexOf('<suggestion id="'+id, hasta + 1));
         console.log("HOLI! "+dentro);
        var j = dentro.indexOf('<');
        while (j!=-1)
        {
          dentro = dentro.substring(0,j)+ dentro.substring(dentro.indexOf('>')+1);
         
          var j = dentro.indexOf('<');
        }
        message = "<p> eliminó " + dentro + " </p>";
        console.log(message);
      }

      //suggestion end 
      var n_otro = yo.indexOf('<suggestion id="'+id, n + size);
      var hasta_otro = yo.indexOf(':', n_otro);
      var id_ptrp_otro = yo.substring(n_otro + size, hasta_otro);
      var hasta_id_otro = yo.indexOf('"', hasta_otro);
      var idUser = yo.substring(hasta_otro + 1, hasta_id_otro);
      yo = yo.substring(0, hasta_otro) +
        yo.substring(hasta_id_otro);

      //Siguiente suggestion
      var n = yo.indexOf('<suggestion id="', n + size);

      console.log(id);
      console.log(idUser);
      console.log(type);
      //console.log(message);
      console.log(yo);

      //Buscar la fecha
      var fecha;
      for (const v of req.body.trackChanges)
      {
        console.log(v);
        if (v.id === id)
        {
          fecha = v.createdAt;
        }

      }

      //Crear y agregar comentario
      var comentario ={
        authorId: idUser,
        commentId: randomString(),
        content: message,
        createdAt: fecha
      };
      let ya=true;
      for (const v of req.body.commets)
      {
        console.log (v);
        if (v["threadId"]===id)
        {
          v["comments"].push(comentario);
          ya=false;
        }
      }
      if (ya)
      {
        req.body.commets.push(
          {
            threadId: id,
            comments: comentario
          }
        )
      }
      
    //  req.body.commets.id.comments.push(comentario);
      // break;
    }

   yo = yo.split("suggestion").join("comment");
  
    yo = yo.split('comment-type="insertion"  type="start"')
    .join('style="background:var(--ck-color-suggestion-marker-insertion-background);"');
 
    yo = yo.split('comment-type="deletion" type="start"')
    .join( 'style="background:var(--ck-color-suggestion-marker-deletion-background);"> <s');
    yo = yo.split('comment-type="deletion" type="end">').join("></s>");
    yo = yo.split('comment-type="insertion"').join("");
    console.log(yo);
    req.body.content= yo;
    req.body.trackChanges= [];
    let setDoc = await db.collection('documents').doc(id_este).set(newData);
    console.log(setDoc);
    var ans = db.collection('documents').doc(id_este);
    var doc = await ans.get();
    let resp = doc.data();
    resp.id_este = doc.id_este;
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
 
 res.send({
  "name": "Prueba uno",
  "content": "<p>Esta es la prueba uno actualizada</p>",
  "lastEdited": "2020-04-25T19:47:48.361Z",
  "id": "9RndSNl1mvxQWoKoRkCz",
  "online": [],
  "author": "santiagowhite99@hotmail.com"
});
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

