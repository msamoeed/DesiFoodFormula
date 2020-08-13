
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




db.collection("menu").where("recipeId", "==", (vOneLS)).limit(1)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
    
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
    });
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


  