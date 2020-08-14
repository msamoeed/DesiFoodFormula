

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

//Moeed's work

var data = [];
var steps = [];

$("#addrecipebutton").click(function() {
 
    var ingr = $("#ingred").val();
    data.push(ingr);
 
    var htmlString =  '<button type="button"  style=" text-align:center;margin:0.3pc; background-color :"#318fb5" id="badgeRec" class="btn btn-primary  badgerecipe">' + ingr ;

  var element =   $('.list-group').after(htmlString);
   

});

$("#removerecipebutton").click(function(){

  $('#badgeRec').remove();
  data.pop();
});


$("#addstepsbutton").click(function() {
 
  var ingr = $("#steps").val();
  
  var htmlString =  '<button type="button"  style=" text-align:center;margin:0.3pc" id="badgeStep" class="btn btn-primary  badgerecipe">' + ingr ;

var element =   $('#steps2List').append("<p id='badgeStep' >" + ingr + "</p>");
steps.push(ingr);
 

});


$("#removestepsbutton").click(function(){

  $('#badgeStep').remove();
 steps.pop();
});



//Fetching Data from fields

var name;
var totalTime;
var description;
var image;
// Getting Image Link and Firebase Storage Instance 
var imageURL ;




$(document).ready(function(){
  $('input[type="file"]').change(function(e){
      var fileName = e.target.files[0].name;
      alert('The file "' + fileName +  '" has been selected.');
      var storageRef = firebase.storage().ref(fileName);
        var file = e.target.files[0];

       var uploadTask =  storageRef.put(file);

      imageURL =  uploadTask.snapshot.ref.getDownloadURL();

      imageURL.then(function(downloadURL) { 
        localStorage.setItem("linkOfImage", null);  

       localStorage.setItem("linkOfImage", downloadURL.toString());  

      
      });


  });
});


//Submitting recipe





$('#submitButton').click(function(){
  name = $('#recipeName').val();
  totalTime = $('#totalTimeMins').val();
  description = $('#recipeDescription').val();

var imgdownload = localStorage.getItem("linkOfImage");  

  db.collection("menu").doc().set({
   image: imgdownload, // <======= this part  took me ages to get right.
    name: name,
   description: description,
   ingredients : data,
   steps : steps,
   uid : vOneLS,
   minutes : totalTime,
   id : generateUniqueFirestoreId(),

  })
    .then(function () {
      console.log("Document successfully written!");
      alert("Recipe Added");
      
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });


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
