//DATABASE INSTANCE

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
  
  
  //Logged In NAV BAR
  var db = firebase.firestore();
  
  var vOneLS = localStorage.getItem("uid");  
  
  db.collection("users").doc(vOneLS)
  .onSnapshot(function(doc) {
      
   $('#btnGroupDrop1').html(doc.data().username);
  
  });

  var uid = localStorage.getItem("uid");
  db.collection("menu").where('uid', '==', uid)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {


    

      // doc.data() is never undefined for query doc snapshots
      var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image +'"  ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >Edit</a> <a  class="btn btn-outline-danger checkButton2"  id= "' + doc.id + '" >Delete</a> </div></div> '
      $("#recipeCards").append(htmlString);


    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });



  $(document).on("click",".checkButton",function() {
    var foodId = $(this).attr("id");
         
        localStorage.setItem("editFood", foodId);
  
        if (localStorage.getItem("editFood") != null){
          window.location.href = 'editRecipe.html';
  
        }
  
        });

        $(document).on("click",".checkButton2",function() {
          var foodId = $(this).attr("id");
               
          db.collection("menu").doc(foodId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
        
              });
//First letter capital
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }