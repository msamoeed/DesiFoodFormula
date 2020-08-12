

var db = firebase.firestore();

var vOneLS = localStorage.getItem("adminUid");

//  alert(vOneLS);
db.collection("admins").doc(vOneLS)
    .onSnapshot(function (doc) {

        $('#btnGroupDrop1').html(doc.data().username);

    });

//Get users and create divs 
db.collection("users")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            var htmlString = ' <div id="' + doc.data().uid + '" class="row card1"> <div class="col-lg-2"> <img id="images" src="images/user.png" alt="User"></div> <div class="col-lg-7"> <h2 id="username"> ' + capitalizeFirstLetter(doc.data().username) + '</h2> <p id="email">' + doc.data().email + '</p></div><div class="col-lg-3"> <button type="button" id="' + doc.data().uid + '" class="btn btn-danger deleteUser"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button> <button type="button" id="' + doc.data().uid + '" class="btn btn-dark editUser"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button> </div> </div> '
            $("#userCards").append(htmlString);

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

//First letter capital
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//search user 
$('input').keyup(function(e) {
    clearTimeout($.data(this, 'timer'));
    if (e.keyCode == 13)
      search(true);
    else
      $(this).data('timer', setTimeout(search, 500));
});


function search(force) {
    alert("entered function");
    var searchValue = $('#searchUser').val(); 
    alert(searchValue);
    if (!force && searchValue.length < 1) return; //wasn't enter, not > 2 char
    var node = document.getElementById('userCards');
    node.innerHTML = "";  
    alert("1213");
    db.collection("users")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {  
            alert("booo");   
            var username22 = doc.data().username;
            var username33 = username22.toLowerCase();
            alert(username33);
            if(username33.startsWith(searchValue)){
                alert("yes yes yes")
                var htmlString = ' <div id="' + doc.data().uid + '" class="row card1"> <div class="col-lg-2"> <img id="images" src="images/user.png" alt="User"></div> <div class="col-lg-7"> <h2 id="username"> ' + capitalizeFirstLetter(doc.data().username) + '</h2> <p id="email">' + doc.data().email + '</p></div><div class="col-lg-3"> <button type="button" id="' + doc.data().uid + '" class="btn btn-danger deleteUser"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button> <button type="button" id="' + doc.data().uid + '" class="btn btn-dark editUser"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button> </div> </div> '
                $("#userCards").append(htmlString);
            }
            else{
                alert("no match!");
            }

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

// $('#search1').click(function(){
//     search(false);
//     alert("after function");
// });


//To remove user
$(document).on("click", ".deleteUser", function () {
    var userId = $(this).attr("id");

    var userId_query = db.collection('users').where('uid', '==', userId);
    userId_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });

   $('#'+userId).remove();

});

//To edit user
$(document).on("click", ".editUser", function () {
    var userId = $(this).attr("id");


    localStorage.setItem("userId", userId);
    if (localStorage.getItem("userId") != null) {
        window.location.href = 'editUser.html';
        
    }
    else{
        alert("User ID null");
    }

});


$("#addUsers1").click(function(){
    window.location.href = "addUsers.html";
});
