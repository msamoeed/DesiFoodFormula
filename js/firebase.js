



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






    // menu.forEach(function(obj) {
    //     db.collection("menu").add({
    //         id: obj.id,
    //         name: obj.name,
    //         description: obj.description,
    //         minutes: obj.minutes,
    //         nutrition: obj.nutrition,
    //         steps: obj.steps,
    //         ingredients : obj.ingredients,
            

    //     }).then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });
    // });