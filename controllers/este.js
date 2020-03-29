const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;
init();
function init()
{
    const config = {
        apiKey: "AIzaSyCzaRR_MNnvk-Qg555Xidk7xZMqxy5M4pk",
        authDomain: "agilex-e65ef.firebaseapp.com",
        databaseURL: "https://agilex-e19c1.firebaseio.com/"
    };
    firebase.initializeApp(config);
   firebase.database().ref().on('value',gotData ,errData );
}
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