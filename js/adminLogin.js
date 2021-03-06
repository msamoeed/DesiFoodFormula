//FIREBASE AUTH
const firebaseConfig = {
    apiKey: "AIzaSyCJqiGG0RkCOgLjW_CVzd4D4ADxNOf-hrQ",
    authDomain: "desifoodformula.firebaseapp.com",
    databaseURL: "https://desifoodformula.firebaseio.com",
    projectId: "desifoodformula",
    storageBucket: "desifoodformula.appspot.com",
    messagingSenderId: "491407610363",
    appId: "1:491407610363:web:35ac62200d4cdfa252fb5e",
    measurementId: "G-2LL6X1QNLB"
  };
  
  firebase.initializeApp(firebaseConfig);
  var admin;
  var db = firebase.firestore();
  
  
  // //SIGN UP ON PRESS//
  $("#signUpButton").click(function () {
    addAdminDataSignUp();
    alert("Signed up!");
  });
  
  
  //Signup admin and add admin data in database.
  function addAdminDataSignUp() {
  
  
    var username = $('#adminNameSignUp').val();
    var email = $('#emailSignUp').val();
    var password = $('#modalLRInputFinal').val();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (userCreds) {
        //result is a promise objecjt in javasciprt
        console.log("register is successful");
        //place in database
  
        admin = firebase.auth().currentUser;
        var uid = admin.uid;
       
        console.log("the id of the admin is:::: " + uid);
        console.log("admin is " + JSON.stringify(admin));
        db.collection("admins").doc(uid).set({
          uid: uid, // <======= this part
          username: username,
          email: email,
        })
          .then(function () {
            console.log("Document successfully written!");
            firebase.auth().currentUser.sendEmailVerification().then(function () {
              // Email Verification sent!
              // [START_EXCLUDE]
              alert('Email Verification Sent!');
              // [END_EXCLUDE]
            });
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
  
  
      })
      .catch(function (error) {
        console.log("error occured");
         
      });
  }
  
  
  //Sign In Firebase.
  var signedInUser;
  var buttonText;
  function SignIn() {


    var email = $("#modalLRInput10").val();
    var pass = $("#modalLRInput11").val();
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      firebase.auth().signInWithEmailAndPassword(email, pass).then(function (userCreds) {
  
        user = firebase.auth().currentUser;
        var uid = user.uid;
         
    
        localStorage.setItem("adminUid", uid);
    
       
        if (localStorage.getItem("uid") != 'null')
        window.location.href = 'adminHomepage.html';
    
      }).catch(function (error) {
    
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
    
      });
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    
    
    // [END authwithemail]
  }

  
  $("#logInButton").click(function () {
  
    var pass = $("#modalLRInput11").val();
    var pass = $("#modalLRInput11").val();
    SignIn();
  
    if (localStorage.getItem("adminUid") != 'null')
      window.location.href = 'adminHomepage.html';
  });
  

  $("#admin-logout").click(function(){

    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  
    localStorage.setItem("adminUid", null);
  
    window.location.href = 'adminLogin.html';
  
  
  
  
    
  
  
  
   });