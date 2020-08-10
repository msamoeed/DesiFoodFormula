var db = firebase.firestore();

var vOneLS = localStorage.getItem("uid");  

 alert(vOneLS);
db.collection("users").doc(vOneLS)
.onSnapshot(function(doc) {
    
 $('#btnGroupDrop1').html(doc.data().username);

});
