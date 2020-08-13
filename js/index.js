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


var data = [];

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
  
  console.log(ingredientsAdded);
  $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">'+ingredient+'</button>');

  ingredient = lowerCaseFirstLetter(ingredient);
  ingredientsAdded.push(ingredient);
});


$(".clear1").click(function(){
  $(".ingredient-remove").remove();
  ingredientsAdded = [];
  console.log(ingredientsAdded);
});

$("#addrecipebutton1").click(function() {
 
  var ingr = $("#ingred").val();
 
  $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">'+ingr+'</button>');
  ingr.toString().trim().toLowerCase();
 ingr = lowerCaseFirstLetter(ingr);
  ingredientsAdded.push(ingr);

 
});

$("#removerecipebutton1").click(function(){

  $('#ingg').remove();
  ingredientsAdded.pop();
});

//Search Recipe using ingredients

$('#searchIt').click(function(){


  var node = document.getElementById('recipeCards');
  node.innerHTML = "";




  db.collection("menu").where('ingredients', 'array-contains-any', ingredientsAdded)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {

      // doc.data() is never undefined for query doc snapshots
      var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image +'"  ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >See More</a></div></div> '
      $("#recipeCards").append(htmlString);

    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

});

$('#searchByName').keyup(function(e) {
  clearTimeout($.data(this, 'timer'));
  if (e.keyCode == 13 || e.keyCode == 8)
    search(true);
  else
    $(this).data('timer', setTimeout(search, 500));
});


function search(force) {
 
  var searchValue = $('#searchByName').val(); 
  if (!force && searchValue.length < 1) return; //wasn't enter, not > 2 char
  var node = document.getElementById('recipeCards');
  node.innerHTML = "";  
  db.collection("menu")
  .get()
  .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {  
          var recipeName22 = doc.data().name;
          var recipeName33 = recipeName22.toLowerCase();
          // alert(recipeName33+ "boooo");
          if(recipeName33.startsWith(searchValue)){
              var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image +'"  ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >See More</a></div></div> '
              $("#recipeCards").append(htmlString);
          }
          // else{
          //     alert("no match!");
          // }

      });
  })
  .catch(function (error) {
      console.log("Error getting documents: ", error);
  });
}




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

var limit = 16;
db.collection("menu").limit(limit)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
   //   localStorage.setItem("uid", null);
      // doc.data() is never undefined for query doc snapshots
      var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail" src= "' + doc.data().image+'"  ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >See More</a></div></div> '
      $("#recipeCards").append(htmlString);

    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

  


$('#showMore1').click(function(){
  
  recipeCardsIndex
  limit = limit + 8;
  var node = document.getElementById('recipeCards');
node.innerHTML = "";


db.collection("menu").limit(limit)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail" src= "' + doc.data().image+'"  ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >See More</a></div></div> '
      $("#recipeCards").append(htmlString);

    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

  
});


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
  

 
  //First letter lowercase
  function lowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  
 
  
  
//Search Recipee

$("#searchIcon").click(function(){

    var name = $("#searchByName").val();

    var node = document.getElementById('recipeCards');
    node.innerHTML = "";

    alert(name);
    db.collection("menu").where('name', '==', name)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {


    

      // doc.data() is never undefined for query doc snapshots
      var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image +'"  ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >See More</a></div></div> '
      $("#recipeCards").append(htmlString);


    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

});



  
///SEND MESSAGE////

$(".btn-unique").click(function(){


var nameM =  $('#form34').val();
var message =  $('#form8').val();
var subject =  $('#form32').val();
var email =  $('#form29').val();

const newId = generateUniqueFirestoreId();


var datake= db.collection("userMessages").doc(newId).set({
  name: nameM, // <======= this part
  message:  message,
  subject: subject,
  email : email,
  id : newId
}).then(function(){

  alert('Message sent!')
})


.catch(error => console.error("Error adding document: ", error))
  }); 
  


  function generateUniqueFirestoreId(){
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return autoId;
  }
