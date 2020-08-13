
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

var db = firebase.firestore();

var vOneLS = localStorage.getItem("foodId");


db.collection("menu").doc(vOneLS)
  .get()
  
    .then(function(doc) {
    
      $('.recipeTitle').html(capitalizeFirstLetter(doc.data().name));
      $('#recipePicture').attr("src", doc.data().image);
      $('#recipeDescriptionText').html( capitalizeFirstLetter(doc.data().description));
      time = doc.data().minutes;
      var timeHtml = ' <li class="list-group-item">' + doc.data().minutes  + " mins" +  '</li>';
      $('#timeTotal').append(timeHtml);
      var ingrediants = doc.data().ingredients;
      var steps = doc.data().steps;
      for (var x = 0; x < ingrediants.length; x++) {
        var html = ' <li class="list-group-item">' + capitalizeFirstLetter(ingrediants[x])  + '</li>'
        $('#ingredTotal').append(html);

      }
      for (var x = 0; x < steps.length; x++) {
          
      
        var stepNumberHtml = '<div class="bs-stepper-header step-block" role="tablist"> <div class="step" data-target="#test-vl-1"><button type="button" class="step-trigger" role="tab" id="stepper4trigger1"aria-controls="test-vl-1"><span class="bs-stepper-circle"> ' + parseInt(x+1) + ' </span><span class="bs-stepper-label">Step' + parseInt(x+1) + '</span></button><p class="stepsOnRecipe">' + capitalizeFirstLetter(steps[x]) + '</p></div>'
        $('#stepper4').append(stepNumberHtml);
       // $('.step').append(html);

      }
    })
 
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

  var userID;
  var rating;
  var comment;

// To add comments
  db.collection("recipeReviews").where("recipeId", "==", (vOneLS))
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      userID = doc.data().uid;
      rating = doc.data().rating;
      comment = doc.data().comment;

      db.collection("users").where('uid', '==', userID)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var rating1 = document.getElementById(rating);
            var ratingHTML = rating1.innerHTML;

            var htmlString = ' <div class="row card1"><div class="col-lg-1"><img id="images" src="images/user.png" alt="User"> </div> <div class="col-lg-11"> <div class="dropdown-item" id="' + rating + '"> ' + ratingHTML + '</div> <h6 id="username"><b>' + doc.data().username + '</b></h6> <p id="comment">' + comment + '</p></div></div>';
            $("#commentsSection").append(htmlString);


          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
 
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

  //First letter capital
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  




// //SIGN UP ON PRESS//
$("#signUpButton").click(function () {
  var password1 = $("#modalLRInput13").val();
  var password2 = $("#modalLRInputFinal").val();

  if(password1 == password2){
    addUserDataSignUp();
    alert("Signed up!");
  }
  else{
    alert("Passwords do not match.");
  }
});


//Signup User and add user data in database.
function addUserDataSignUp() {


  var username = $('#userNameSignUp').val();
  var email = $('#emailSignUp').val();
  var password = $('#modalLRInputFinal').val();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCreds) {
      //result is a promise objecjt in javasciprt
      console.log("register is successful");
      //place in database

      user = firebase.auth().currentUser;
      var uid = user.uid;
      console.log("the id of the user is:::: " + uid);
      console.log("user is " + JSON.stringify(user));
      db.collection("users").doc(uid).set({
        uid: userCreds.user.uid, // <======= this part
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
      alert(error.message);
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
       
  
      localStorage.setItem("uid", uid);
  
     
      if (localStorage.getItem("uid") != null)
      window.location.href = 'homeAfterLogin.html';
  
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

 
  SignIn();
    alert(localStorage.getItem("uid"));
 
});


//Logout USER
$(".nav-logo").click(function () {

  var checkLogin = localStorage.getItem("uid");



  if (checkLogin != "null") {

    window.location.href = 'homeAfterLogin.html';

  }

  else {
    window.location.href = 'index.html';

  }

});
