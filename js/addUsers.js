// //SIGN UP ON PRESS//
$("#addUserButton").click(function () {
    var pass = $('#password').val();
    var rpass = $('#repeatPassword').val();

    if(pass == rpass){
        addUserData();
        alert("User Added!");
    }
    else{
        alert("Passwords do not match");
    }
    
  });
  
  
  //Signup User and add user data in database.
  function addUserData() {
  
  
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (userCreds) {
        //result is a promise objecjt in javasciprt
        console.log("register is successful");
        //place in database
  
        user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log("the id of the user is:::: " + uid);
        console.log("user is " + JSON.stringify(user));
        db.collection("users").doc(uid).set({
          uid: userCreds.user.uid, // <======= this part
          username: username,
          email: email,
        })
          .then(function () {
            console.log("Document successfully written!");
            firebase.auth().currentUser.sendEmailVerification().then(function () {
              // Email Verification sent!
              // [START_EXCLUDE]
              alert('Email Verification Sent!');
              // [END_EXCLUDE]
            });
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
  
  
      })
      .catch(function (error) {
        console.log("error occured");
        alert(error.message);
      });
  }
  