
function init() {
  // Initialize Firebase.
  // TODO: replace with your Firebase project configuration.
  const config = {
    apiKey: "AIzaSyCzaRR_MNnvk-Qg555Xidk7xZMqxy5M4pk",
    authDomain: "agilex-e65ef.firebaseapp.com",
    databaseURL: "https://agilex-e19c1.firebaseio.com/"
  };
  
  firebase.initializeApp(config);

  //Desaparecer el editor de texto
  document.getElementById('firepad').style.display = "none";
  document.getElementById('userlist').style.display = "none";

  //Hacer indice
  firebase.database().ref().on('value', gotData, errData);
}

function goTo(idDocumento) {
  //Desaparecer indice
  document.getElementById('score').style.display = "none";

  //Desplegar editor
  document.getElementById('firepad').style.display = "block";
  document.getElementById('userlist').style.display = "block";
  var firepadRef = getExampleRef(idDocumento);

  // Create CodeMirror (with lineWrapping on).
  var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });

  // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
  var userId = Math.floor(Math.random() * 9999999999).toString();

  // Create Firepad (with rich text features and our desired userId).
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
    { richTextToolbar: true, richTextShortcuts: true, userId: userId });

  // Create FirepadUserList (with our desired userId).
  var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),

    document.getElementById('userlist'), userId);

  // Initialize contents.
  firepad.on('ready', function () {
    if (firepad.isHistoryEmpty()) {
      firepad.setText('Check out the user list to the left!');
    }
  });
}
function gotData(snapshot) {
  var scores = snapshot.val();
  var keys = Object.keys(scores);
  for (var i = 0; i < keys.length; i++) {
    
    var li = document.createElement('div');
    var p = document.createElement('p');
    var button = document.createElement("img");


    button.setAttribute("src", "https://www.pinclipart.com/picdir/middle/357-3572972_submit-your-application-documento-png-clipart.png");
    button.setAttribute("height", "50");
    button.innerHTML = keys[i];
    p.setAttribute("style", "line-height:50px;");
    p.innerHTML =  keys[i];
    button.setAttribute("onClick", "goTo('" + keys[i] + "')");
    
    li.appendChild(button);
    li.appendChild(p);


    if (li != null)
      document.getElementById("score").appendChild(li);
  }

}
function errData(snapshot) {

  console.log('err');

}

// Helper to get hash from end of URL or generate a random one.
function getExampleRef(idDocumento) {
  var ref = firebase.database().ref();
  window.location =  '#' + idDocumento;
  var hash = window.location.hash.replace(/#/g, '');
  
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  return ref;
}