// Scroll location identifier for navbar
$(document).ready(function () {
    if ($(document).scrollTop() > $("nav").height() / 2) {
        $("nav").addClass("nav-halfscrolled");
    } else if ($(document).scrollTop() > $("nav").height()) {
        $("nav").addClass("nav-scrolled");
    }
});

// Applications Accordion Toggler
$(".application-1-button").click(function () {
    $(".application-1").addClass("show");
    $(".application-2").removeClass("show");
});

$(".application-2-button").click(function () {
    $(".application-1").removeClass("show");
    $(".application-2").addClass("show");
});

// Application Button Toggler
$(".application-1-button").click(function () {
    $(".add-triangle-1").addClass("triangle");
    $(".add-triangle-2").removeClass("triangle");
    $(".application-1").addClass("anim");
    $(".application-2").removeClass("anim");
});

$(".application-2-button").click(function () {
    $(".add-triangle-2").addClass("triangle");
    $(".add-triangle-1").removeClass("triangle");
    $(".application-2").addClass("anim");
    $(".application-1").removeClass("anim");
});

// Focus 1st application button on reload
$(document).ready(function () {
    $(".application-1-button").focus();
    $(".add-triangle-1").addClass("triangle");
})

// Add hr to navigation toggler
function navHrAdd() {
    if ($(window).width() < 992) {
        $(".nav-item").after("<hr class='nav-hr'>")
    } else {
        console.log("nav-hr-add says width greater than 992px")
    }
};

function navHrRemove() {
    if ($(window).width() > 992) {
        $(".nav-hr").remove()
    } else {
        console.log("nav-hr-remove says width less than 992px")
    }
};

$(document).ready(navHrAdd);
$(window).resize(navHrRemove);

// Add navbar margin when expanded in products.html
$(".navbar-toggler").click(function () {
    $(".phone-container, .screenshot-container, .overlay-container").toggleClass("navbar-expand-margin");
})


var data = [];

//Search Recipes Section

//To slide toggle rearch recipes function
$(".searchByIngredients").slideUp();
$("#searchRecipe").click(function () {
    window.scroll(0, 0);
    $(".searchByIngredients").slideToggle();
});

var ingredientsAdded = [];

$(".ing1").click(function () {
    var ingredient = $(this).html();

    console.log(ingredientsAdded);
    $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">' + ingredient + '</button>');

    ingredient = lowerCaseFirstLetter(ingredient);
    ingredientsAdded.push(ingredient);
});


$(".clear1").click(function () {
    $(".ingredient-remove").remove();
    ingredientsAdded = [];
    console.log(ingredientsAdded);
});

$("#addrecipebutton1").click(function () {

    var ingr = $("#ingred").val();

    $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">' + ingr + '</button>');
    ingr.toString().trim().toLowerCase();
    ingr = lowerCaseFirstLetter(ingr);
    ingredientsAdded.push(ingr);


});

$("#removerecipebutton1").click(function () {

    $('#ingg').remove();
    ingredientsAdded.pop();
});

//Search Recipe using ingredients

$('#searchIt').click(function () {


    var node = document.getElementById('recipeCards');
    node.innerHTML = "";




    db.collection("menu").where('ingredients', 'array-contains-any', ingredientsAdded)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                // doc.data() is never undefined for query doc snapshots
                var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image + '"  ><div class="card-body"><h5 class="card-title"> ' + capitalizeFirstLetter(doc.data().name) + '   </h5><p class="card-text"> ' + capitalizeFirstLetter(doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.data().recipeId + '" >See More</a></div></div> '
                $("#recipeCards").append(htmlString);

            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

});

$('#searchByName').keyup(function (e) {
    clearTimeout($.data(this, 'timer'));
    if (e.keyCode == 13 || e.keyCode == 8)
        search(true);
    else
        $(this).data('timer', setTimeout(search, 500));
});


function search(force) {

    var searchValue = $('#searchByName').val();
    if (!force && searchValue.length < 1) return; //wasn't enter, not > 2 char
    var node = document.getElementById('recipeCards');
    node.innerHTML = "";
    db.collection("menu")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                alert(doc.id + "HERLLOO");
                var recipeName22 = doc.data().name;
                var recipeName33 = recipeName22.toLowerCase();
                // alert(recipeName33+ "boooo");
                if (recipeName33.startsWith(searchValue)) {
                    var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6 ' + doc.data().recipeId + '" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image + '"  ><div class="card-body"><h5 class="card-title"> ' + capitalizeFirstLetter(doc.data().name) + '   </h5><p class="card-text"> ' + capitalizeFirstLetter(doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.data().recipeId + '" >See More</a></div></div> '
                    $("#recipeCards").append(htmlString);
                }
                // else{
                //     alert("no match!");
                // }

            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}




//FIREBASE AUTH


var user;
var db = firebase.firestore();



var limit = 16;
db.collection("menu").limit(limit)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id);
            var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6 ' + doc.data().recipeId + '" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image + '"  ><div class="card-body"><h5 class="card-title"> ' + capitalizeFirstLetter(doc.data().name) + '   </h5><p class="card-text"> ' + capitalizeFirstLetter(doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >Edit</a> <a  class="btn btn-outline-danger checkButton2"  id= "' + doc.id + '" >Delete</a> </div></div>'
            $("#recipeCards").append(htmlString);

        });
    })
   
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });



//Show more recipes using 'Show More' Button
$('#showMore1').click(function () {

    recipeCardsIndex
    limit = limit + 8;
    var node = document.getElementById('recipeCards');
    node.innerHTML = "";


    db.collection("menu").limit(limit)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6 ' + doc.data().recipeId + '" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image + '"  ><div class="card-body"><h5 class="card-title"> ' + capitalizeFirstLetter(doc.data().name) + '   </h5><p class="card-text"> ' + capitalizeFirstLetter(doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >Edit</a> <a  class="btn btn-outline-danger checkButton2"  id= "' + doc.id + '" >Delete</a> </div></div>'
                $("#recipeCards").append(htmlString);

            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });


});





//First letter capital
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



//First letter lowercase
function lowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}




//Search Recipee

$("#searchIcon").click(function () {

    var name = $("#searchByName").val();

    var node = document.getElementById('recipeCards');
    node.innerHTML = "";

    alert(name);
    db.collection("menu").where('name', '==', name)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {




                // doc.data() is never undefined for query doc snapshots
                var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6 ' + doc.data().recipeId + '" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image + '"  ><div class="card-body"><h5 class="card-title"> ' + capitalizeFirstLetter(doc.data().name) + '   </h5><p class="card-text"> ' + capitalizeFirstLetter(doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >Edit</a> <a  class="btn btn-outline-danger checkButton2"  id= "' + doc.id + '" >Delete</a> </div></div>'
                $("#recipeCards").append(htmlString);


            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

});


function generateUniqueFirestoreId() {
    // Alphanumeric characters
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return autoId;
}


//To delete recipe
$(document).on("click", ".checkButton2", function () {
    var foodId = $(this).attr("id");

    db.collection("menu").doc(foodId).delete().then(function () {
        $('.' + foodId).remove();
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
});

//To edit recipe
$(document).on("click", ".checkButton", function () {
    localStorage.setItem("recipeID1", null);

    var foodId = $(this).attr("id");
    localStorage.setItem("recipeID1", foodId);

    if (localStorage.getItem("foodId") != null) {
        window.location.href = 'adminEditRecipe.html';

    }

});

