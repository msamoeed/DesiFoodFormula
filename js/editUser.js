

var db = firebase.firestore();

var vOneLS = localStorage.getItem("adminUid");
var vOneLS1 = localStorage.getItem("userId");


db.collection("admins").doc(vOneLS)
    .onSnapshot(function (doc) {

        $('#btnGroupDrop1').html(doc.data().username);

    });

//Get users and create divs 
db.collection("users")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            if(vOneLS1 == doc.data().uid){
                var username1 = doc.data().username;
                var email1 = doc.data().email;
                

                document.getElementById("headUsername").textContent = username1;
                $("#username").attr("placeholder", username1);
                $("#email").attr("placeholder", email1);
            }
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


    $('#saveChanges').click(function(){
        var username2 = $('#username').val();
        var email2 = $('#email').val();
       

     

        db.collection("users").doc(vOneLS1).update({
            username: username2,
            email: email2,
      
        })
          .then(function () {
            console.log("Document successfully written!");
            alert("Recipe Added");
            
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      
      
      });






