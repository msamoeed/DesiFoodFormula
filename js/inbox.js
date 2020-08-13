

var db = firebase.firestore();

var vOneLS = localStorage.getItem("adminUid");


db.collection("admins").doc(vOneLS)
    .onSnapshot(function (doc) {

        $('#btnGroupDrop1').html(doc.data().username);

    });

//Get user messages and create divs 
db.collection("userMessages")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var htmlString = ' <div id="' + doc.data().id + '" class="row card1"><div class="col-lg-2"><img id="images" src="images/user.png" alt="User"></div><div class="col-lg-7"><h2 id="name">' + capitalizeFirstLetter(doc.data().name) + '</h2><p id="email">' + capitalizeFirstLetter(doc.data().email) + '</p><p id="subject">Subject: ' + capitalizeFirstLetter(doc.data().subject) + '</p><p id="message">' + capitalizeFirstLetter(doc.data().message) + '</p></div><div class="col-lg-3"><button type="button" id="' + doc.data().id + '" class="btn btn-danger deleteMessage"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button></div></div> '
            $("#messageCards").append(htmlString);

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

//First letter capital
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



//To remove message
$(document).on("click", ".deleteMessage", function () {
    var messageId = $(this).attr("id");
    var userId_query = db.collection('userMessages').where('id', '==', messageId);
    userId_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });

    $('#'+messageId).remove();

});
