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

      selectedID = selectedID.toString().split('-')[0];
      
      
   });


  $("#submitButton").click(function(){
     
        alert("asdasd");

    var checkLogin = localStorage.getItem("uid");
  


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




 