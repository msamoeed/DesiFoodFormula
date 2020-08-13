
//DATABASE INSTANCE

var vOneLS = localStorage.getItem("adminUid");  


db.collection("admins").doc(vOneLS)
.onSnapshot(function(doc) {
    
 $('#btnGroupDrop1').html(doc.data().username);

});

var db = firebase.firestore();


var foodIdEdit;

var edit = localStorage.getItem("recipeID1");


db.collection("menu").doc(edit)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {


            foodIdEdit = doc.data().recipeId;



            $('#recipeName').attr("placeholder", doc.data().name);
            $('#totalTimeMins').attr("placeholder", doc.data().time);
            $('#recipeDescription').attr("placeholder", doc.data().description);
            var ingrediants = doc.data().ingredients;
            for (var x = 0; x < ingrediants.length; x++) {


                var htmlString = '<button type="button"  style=" text-align:center;margin:0.3pc; background-color :"#318fb5" id="badgeRec" class="btn btn-primary  badgerecipe">' + doc.data().ingredients[x];
                var element = $('.list-group').after(htmlString);

            }

            for (var x = 0; x < doc.data().steps.length; x++) {


                var htmlString = '<button type="button"  style=" text-align:center;margin:0.3pc" id="badgeStep" class="btn btn-primary  badgerecipe">' + doc.data().steps[x];

                var element = $('#steps2List').append("<p id='badgeStep' >" + doc.data().steps[x] + "</p>");

            }


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });






//Moeed's work

var data = [];
var steps = [];

$("#addrecipebutton").click(function () {

    var ingr = $("#ingred").val();
    data.push(ingr);

    var htmlString = '<button type="button"  style=" text-align:center;margin:0.3pc; background-color :"#318fb5" id="badgeRec" class="btn btn-primary  badgerecipe">' + ingr;

    var element = $('.list-group').after(htmlString);


});

$("#removerecipebutton").click(function () {

    $('#badgeRec').remove();
    data.pop();
});


$("#addstepsbutton").click(function () {

    var ingr = $("#steps").val();
    steps.push(ingr);

    var htmlString = '<button type="button"  style=" text-align:center;margin:0.3pc" id="badgeStep" class="btn btn-primary  badgerecipe">' + ingr;

    var element = $('#steps2List').append("<p id='badgeStep' >" + ingr + "</p>");
    steps.push(ingr);


});


$("#removestepsbutton").click(function () {

    $('#badgeStep').remove();
    steps.pop();
});



//Fetching Data from fields

var name;
var totalTime;
var description;
var image;
// Getting Image Link and Firebase Storage Instance 
var imageURL;




$(document).ready(function () {
    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        alert('The file "' + fileName + '" has been selected.');
        var storageRef = firebase.storage().ref(fileName);
        var file = e.target.files[0];

        var uploadTask = storageRef.put(file);

        imageURL = uploadTask.snapshot.ref.getDownloadURL();

        imageURL.then(function (downloadURL) {

            localStorage.setItem("linkOfImage", downloadURL.toString());


        });


    });
});


//Submitting recipe





$('#submitButton').click(function () {
    name = $('#recipeName').val();
    totalTime = $('#totalTimeMins').val().toString();
    description = $('#recipeDescription').val();
    alert("editing");

    var imgdownload = localStorage.getItem("linkOfImage");

    db.collection("menu").where("recipeId", "==", edit).set({
        image: imgdownload, // <======= this part  took me ages to get right.
        name: name,
        description: description,
        ingredients: data,
        steps: steps,
        time: totalTime,
        recipeId: edit,

    })
        .then(function () {
            console.log("Document successfully written!");
            alert("Recipe Added");

        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


});