function init() {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
        apiKey: "AIzaSyCzaRR_MNnvk-Qg555Xidk7xZMqxy5M4pk",
        authDomain: "agilex-e65ef.firebaseapp.com",
        databaseURL: "https://agilex-e65ef.firebaseio.com"
    };
    firebase.initializeApp(config);

    //// Get Firebase Database reference.
    var firepadRef = getExampleRef();

    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });

    // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
    var userId = Math.floor(Math.random() * 9999999999).toString();

    //// Create Firepad (with rich text features and our desired userId).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextToolbar: true, richTextShortcuts: true, userId: userId });

    //// Create FirepadUserList (with our desired userId).
    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
        document.getElementById('userlist'), userId);

    //// Initialize contents.
    firepad.on('ready', function () {
        if (firepad.isHistoryEmpty()) {
            firepad.setText('Check out the user list to the left!');
        }
    });
}

// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
    var ref = firebase.database().ref();
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