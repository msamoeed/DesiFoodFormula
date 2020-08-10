const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyCJqiGG0RkCOgLjW_CVzd4D4ADxNOf-hrQ",
    authDomain: "desifoodformula.firebaseapp.com",
    databaseURL: "https://desifoodformula.firebaseio.com",
    projectId: "desifoodformula",
    storageBucket: "desifoodformula.appspot.com",
    messagingSenderId: "491407610363",
    appId: "1:491407610363:web:35ac62200d4cdfa252fb5e",
    measurementId: "G-2LL6X1QNLB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var db = firebase.firestore();
  
  
 


 db.collection('menu').i






    // menu.forEach(function(obj) {
    //     db.collection("menu").add({
    //         id: obj.id,
    //         name: obj.name,
    //         description: obj.description,
    //         minutes: obj.minutes,
    //         nutrition: obj.nutrition,
    //         steps: obj.steps,
    //         ingredients : obj.ingredients,
            

    //     }).then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });
    // });