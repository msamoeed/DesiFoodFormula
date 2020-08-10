
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




db.collection("menu").where("id", "==", parseInt(vOneLS)).limit(1)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
    
      $('.recipeTitle').html(capitalizeFirstLetter(doc.data().name));
      $('#recipePicture').attr("src", doc.data().image);
      $('#recipeDescriptionText').html( capitalizeFirstLetter(doc.data().description));
      var ingrediants = doc.data().ingredients;
      var steps = doc.data().steps;
      for (var x = 0; x < ingrediants.length; x++) {
        var html = ' <li class="list-group-item">' + capitalizeFirstLetter(ingrediants[x])  + '</li>'
        $('.list-group').append(html);

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


  //First letter capital
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }