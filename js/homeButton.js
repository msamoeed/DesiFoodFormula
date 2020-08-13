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


$('#log-out').click(function () {


  localStorage.setItem("uid", null);
  window.location.href = 'index.html';


});

//ADD to Favorite

$('.favbutton').click(function () {

  var checkLogin = localStorage.getItem("uid");
  var vOneLS = localStorage.getItem("foodId");

  if (checkLogin != "null") {
    var favId = generateUniqueFirestoreId();
    db.collection("userFav").doc(favId).set({
      id: favId,
      recipeId: vOneLS,
      uid: checkLogin,

    })
      .then(function () {
        console.log("Document successfully written!");
        alert("Added to Favourite")
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });


  }
  else {
    alert("Please login first");

  }



});


function generateUniqueFirestoreId() {
  // Alphanumeric characters
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return autoId;
}


var selectedID;
  $('.dropdown-item').click(function(){

      selectedID = $(this).attr("id");   
   });

//To add comments

var recipe = localStorage.getItem("foodId");

$("#submitButton").click(function () {
  alert("asdasd");
  var checkLogin = localStorage.getItem("uid");
  // var selectedID = $('.dropdown-item').attr("id");
  if (checkLogin != "null") {
    var comment = $('#exampleFormControlTextarea1').val();
    var key = generateUniqueFirestoreId();

    //To  save in database
    db.collection("recipeReviews").doc(key).set({
      reviewId: key,
      recipeId: recipe,
      rating: selectedID,
      comment: comment,
      uid: checkLogin
    })
      .then(function () {
        console.log("Document successfully written!");

      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    
    //To display on screen

    //First to get username
    var username;
    var userId_query = db.collection('users').where('uid', '==', checkLogin);
    userId_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        username = doc.data().username;
      });
    })
    .then(function(){
      var rating1 = document.getElementById(selectedID);
      var ratingHTML = rating1.innerHTML;
  
      var htmlString = ' <div class="row card1"><div class="col-lg-1"><img id="images" src="images/user.png" alt="User"> </div> <div class="col-lg-11"> <div class="dropdown-item" id="' + selectedID + '"> ' + ratingHTML + '</div> <h6 id="username"><b>' + username + '</b></h6> <p id="comment">' + comment + '</p></div></div>';
      $("#commentsSection").append(htmlString);
  
    });
  }
  else {
    alert("Please Sign-In to comment")

  }
});




