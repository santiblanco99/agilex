const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyCABIcza604wAWi0s-yR2tBYlG7YMsOO04",
    authDomain: "agilex-e19c1.firebaseapp.com",
    databaseURL: "https://agilex-e19c1.firebaseio.com",
    projectId: "agilex-e19c1",
    storageBucket: "agilex-e19c1.appspot.com",
    messagingSenderId: "93470289336",
    appId: "1:93470289336:web:d7e5a80625a9addf72f34d",
    measurementId: "G-2B5Z46HLXR"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;