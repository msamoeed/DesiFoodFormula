//Logout USER
$(".nav-logo").click(function(){

    var checkLogin = localStorage.getItem("uid");
  


    if (checkLogin != "null"){

        window.location.href = 'homeAfterLogin.html';

    }

    else {
        window.location.href = 'index.html';

    }

});


$('#log-out').click(function(){
  

   localStorage.setItem("uid", null);
  window.location.href = 'index.html';


}); 

//ADD to Favorite

$('.favbutton').click(function(){

    var checkLogin = localStorage.getItem("uid");
    var vOneLS = localStorage.getItem("foodId");

    if (checkLogin != "null"){


        var favId = generateUniqueFirestoreId();
        db.collection("userFav").doc(favId).set({
            id:favId,
            recipeId : vOneLS,
            uid : checkLogin,

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


  var selectedID;
  $('.dropdown-item').click(function(){

      selectedID = $(this).attr("id");

     
      
      
   });


  $("#submitButton").click(function(){
     

    var checkLogin = localStorage.getItem("uid");
    var recipe = localStorage.getItem("foodId");



    if (checkLogin != "null"){
    

        
         var comment = $('#exampleFormControlTextarea1').val();
         var key = generateUniqueFirestoreId();
         db.collection("recipeReviews").doc(key).set({
            recipeId : key,
            rating : selectedID,
            comment : comment,
            uid : checkLogin
          })
            .then(function () {
              console.log("Document successfully written!");
            
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
    
        
      

    }

    else {
       alert("Please Sign-In to comment")

    }
  

    
   
  
  });




  var checkLogin = localStorage.getItem("uid");
  


  if (checkLogin != "null"){
   

    var html = '<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-white"> <a class="navbar-brand" href="#"> <img class="nav-logo" src="images/logo.png" alt="logo" width="50px"> </a> <h3> DesiFoodFormula</h3> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav"> <ul class="navbar-nav ml-auto"><li class="nav-item nav-item1">  </li><li class="nav-item nav-item1"> <a class="nav-link" data-toggle="modal" data-target="#modalContactForm">Contact<span class="sr-only">(current)</span></a> </li><li class="nav-item"> <a class="nav-link" href="#company">All Recipes</a> </li> <li> <div class="btn-group profile" role="group"> <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Khadija Khan </button> <div class="dropdown-menu" aria-labelledby="btnGroupDrop1"> <a class="dropdown-item drop" href="#"><i class="fa fa-cutlery icons" aria-hidden="true"></i> My Recipes</a> <a class="dropdown-item drop" href="favorite.html"><i class="fa fa-heart icons" aria-hidden="true"></i> Favourites</a> <div class="dropdown-divider"></div> <a class="dropdown-item drop" href="addRecipes.html"><i class="fa fa-plus" aria-hidden="true"></i></i> Add Recipe</a> <div class="dropdown-divider"></div> <a class="dropdown-item drop" href="recipeSelector.html"><i class="fa fa-heart icons" aria-hidden="true"></i> Edit Recipes</a> <div class="dropdown-divider"></div> <a class="dropdown-item drop" id="log-out" href="#"><i class="fa fa-sign-out icons" aria-hidden="true"></i></i> Logout</a> </div> </div> </li> </ul> </div> </nav>';
  
    $('#recipeBody').append(html);

    var db = firebase.firestore();

var vOneLS = localStorage.getItem("uid");  

db.collection("users").doc(vOneLS)
.onSnapshot(function(doc) {
    
 $('#btnGroupDrop1').html(doc.data().username);

});
  
      
    

  }

  else {
     alert("Please Sign-In to comment")

  }


 $("#admin-logout").click(function(){

  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });

  localStorage.setItem("adminUid", null);

  window.location.href = 'adminLogin.html';




  



 });