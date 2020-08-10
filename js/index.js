// Scroll location identifier for navbar
$(document).ready(function() {
  if ($(document).scrollTop() > $("nav").height() / 2) {
    $("nav").addClass("nav-halfscrolled");
  } else if ($(document).scrollTop() > $("nav").height()) {
    $("nav").addClass("nav-scrolled");
  }
});

// Applications Accordion Toggler
$(".application-1-button").click(function() {
  $(".application-1").addClass("show");
  $(".application-2").removeClass("show");
});

$(".application-2-button").click(function() {
  $(".application-1").removeClass("show");
  $(".application-2").addClass("show");
});

// Application Button Toggler
$(".application-1-button").click(function() {
  $(".add-triangle-1").addClass("triangle");
  $(".add-triangle-2").removeClass("triangle");
  $(".application-1").addClass("anim");
  $(".application-2").removeClass("anim");
});

$(".application-2-button").click(function() {
  $(".add-triangle-2").addClass("triangle");
  $(".add-triangle-1").removeClass("triangle");
  $(".application-2").addClass("anim");
  $(".application-1").removeClass("anim");
});

// Focus 1st application button on reload
$(document).ready(function() {
  $(".application-1-button").focus();
  $(".add-triangle-1").addClass("triangle");
})

// Add hr to navigation toggler
function navHrAdd() {
  if ($(window).width() < 992) {
    $(".nav-item").after("<hr class='nav-hr'>")
  } else {
    console.log("nav-hr-add says width greater than 992px")
  }
};

function navHrRemove() {
  if ($(window).width() > 992) {
    $(".nav-hr").remove()
  } else {
    console.log("nav-hr-remove says width less than 992px")
  }
};

$(document).ready(navHrAdd);
$(window).resize(navHrRemove);

// Add navbar margin when expanded in products.html
$(".navbar-toggler").click(function () {
  $(".phone-container, .screenshot-container, .overlay-container").toggleClass("navbar-expand-margin");
})




//Search Recipes Section

//To slide toggle rearch recipes function
$(".searchByIngredients").slideUp();
$("#searchRecipe").click(function(){
  window.scroll(0, 0);
  $(".searchByIngredients").slideToggle();
});

var ingredientsAdded = [];

$(".ing1").click(function(){
  var ingredient = $(this).html();
  ingredientsAdded.push(ingredient);
  console.log(ingredientsAdded);
  $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">'+ingredient+'</button>');
});


$(".clear1").click(function(){
  $(".ingredient-remove").remove();
  ingredientsAdded = [];
  console.log(ingredientsAdded);
});

$("#addrecipebutton1").click(function() {
 
  var ingr = $("#ingred").val();
  alert(ingr);
  data.push(ingredientsAdded);
  $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">'+ingr+'</button>');
 
});

$("#removerecipebutton1").click(function(){

  $('#ingg').remove();
  data.pop();
});


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
var user;
var db = firebase.firestore();


// //SIGN UP ON PRESS//
$("#signUpButton").click(function () {
  addUserDataSignUp();
  alert("Signed up!");
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
  firebase.auth().signInWithEmailAndPassword(email, pass).then(function (userCreds) {

    user = firebase.auth().currentUser;
    var uid = user.uid;

    
    localStorage.setItem("uid", uid);

   
    docRef.get().then(function (doc) {
      if (doc.exists) {
        var userData = doc.data();
        var decoded = JSON.stringify(userData);

        buttonText = decoded;





      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

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
  // [END authwithemail]
}
$("#logInButton").click(function () {

  var pass = $("#modalLRInput11").val();
  var pass = $("#modalLRInput11").val();
  SignIn();

  if (localStorage.getItem("uid") != null)
    window.location.href = 'homeAfterLogin.html';
});


db.collection("menu").limit(16)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6"><img id= "mainImage" class="img-fluid img-thumbnail" src= "' + doc.data().image+'" alt="Card image cap" ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-primary checkButton"  id= "' + doc.data().id + '" >Check</a></div></div> '
      $("#recipeCards").append(htmlString);

    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });


// $('#checkButton').on('click', function (e) {
//   alert("asd");
//   disconnectFunction(e.target);
// });

$(document).on("click",".checkButton",function() {
  var foodId = $(this).attr("id");
       

      localStorage.setItem("foodId", foodId);

      if (localStorage.getItem("foodId") != null){
        window.location.href = 'recipe.html';

      }

      });




  // //SIGN IN ON PRESS//



  //First letter capital
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

 
    



 
  
  
                    


 
