
var modelLocation = '../modules/Blog'

var util = require('util');
var express = require('express');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;
const Window = require('window');
const window = new Window();

 /**  Model and route setup **/

 var model = require(modelLocation).model;
 const route = 'index';

 const routeIdentifier = util.format('/%s', route);


 var firebase = require('firebase');
 var yo=[];

//  // Initialize Firebase.
//  // TODO: replace with your Firebase project configuration.
//  var config = {
//     apiKey: "AIzaSyCzaRR_MNnvk-Qg555Xidk7xZMqxy5M4pk",
//     authDomain: "agilex-e65ef.firebaseapp.com",
//     databaseURL: "https://agilex-e19c1.firebaseio.com/"
//  };
//  firebase.initializeApp(config);
 

 /** Router setup **/


 var router = express.Router();


       const config = {
        apiKey: "AIzaSyCzaRR_MNnvk-Qg555Xidk7xZMqxy5M4pk",
        authDomain: "agilex-e65ef.firebaseapp.com",
        databaseURL: "https://agilex-e19c1.firebaseio.com/"
    };
    firebase.initializeApp(config);
   //firebase.database().ref().on('value',gotData ,errData );

 router.get(routeIdentifier, function(req, res, next) {
     
     const config = {
        apiKey: "AIzaSyCzaRR_MNnvk-Qg555Xidk7xZMqxy5M4pk",
        authDomain: "agilex-e65ef.firebaseapp.com",
        databaseURL: "https://agilex-e19c1.firebaseio.com/"
    };
   
    //
    res.json("HOLA");
    yo="";

    //firebase.database().ref().on("child_added",yo );
    //new Document();
   //createElement('lo',"JJSJDJJ ");
   //g = document.createElement('score');
  // g.setAttribute("id", "score");
   //console.log(document.getElementById("score"));
  
    //res.json(document.getElementById("score"));
   // console.log(yo);
 });

    function gotData (snapshot) {
        var scores = snapshot.val();
        var keys = Object.keys(scores);
        console.log(keys);
        for (var i=0;i<keys.length;i++)
        {
          //  new Document();
            var li= document.createElement('button');
            li.textContent="holiz "+keys[i];
            if (li!=null)
             document.getElementById("score").appendChild(li);
           // $().parent('score');
            console.log(document.getElementById("score"));
        } 
       
      }
      function errData (snapshot) {
            
        console.log('err');
       
      }
 module.exports = router;