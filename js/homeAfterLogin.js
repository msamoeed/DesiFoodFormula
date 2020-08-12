var db = firebase.firestore();

var vOneLS = localStorage.getItem("uid");  

 alert(vOneLS);
db.collection("users").doc(vOneLS)
.onSnapshot(function(doc) {
    
 $('#btnGroupDrop1').html(doc.data().username);

});

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
      var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image +'"  ><div class="card-body"><h5 class="card-title"> ' +  capitalizeFirstLetter( doc.data().name)  + '   </h5><p class="card-text"> ' + capitalizeFirstLetter( doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' +doc.data().recipeId+ '" >See More</a></div></div> '
      $("#recipeCards").append(htmlString);


    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

});


