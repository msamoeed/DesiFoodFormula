//Navbar Video Overlay Resizer
function overlayResizer() {
  var videoHeight = ($("video").height());
  $(".overlay").height(videoHeight);
  $(".home-video").height(videoHeight);

  var videoposition = ($("video").position());
  $(".overlay").position(videoposition);
  $(".home-video").position(videoposition);

  var navbarHeight = ($("nav").outerHeight());
  $(".home-video").css("margin-top", navbarHeight)
  $(".products").css("margin-top", navbarHeight)
  $(".resources").css("margin-top", navbarHeight)
}

$(window).resize(overlayResizer);
$(window).ready(overlayResizer);

// console.log($("nav").height());

// Navbar Style Toggler
// $(document).scroll(function(){
//   $("nav").toggleClass("nav-halfscrolled", $(this).scrollTop() > $("nav").height()/2 );
// });

// $(document).scroll(function(){
//   $("nav").toggleClass("nav-scrolled", $(this).scrollTop() > 70 );
// });

// console.log($("nav").height());

// Scroll location identifier for navbar
$(document).ready(function() {
  if ($(document).scrollTop() > $("nav").height() / 2) {
    $("nav").addClass("nav-halfscrolled");
  } else if ($(document).scrollTop() > $("nav").height()) {
    $("nav").addClass("nav-scrolled");
  }
});

// Applications Accordion Toggler
$(".application-1-button").click(function() {
  $(".application-1").addClass("show");
  $(".application-2").removeClass("show");
});

$(".application-2-button").click(function() {
  $(".application-1").removeClass("show");
  $(".application-2").addClass("show");
});

// Application Button Toggler
$(".application-1-button").click(function() {
  $(".add-triangle-1").addClass("triangle");
  $(".add-triangle-2").removeClass("triangle");
  $(".application-1").addClass("anim");
  $(".application-2").removeClass("anim");
});

$(".application-2-button").click(function() {
  $(".add-triangle-2").addClass("triangle");
  $(".add-triangle-1").removeClass("triangle");
  $(".application-2").addClass("anim");
  $(".application-1").removeClass("anim");
});

// Focus 1st application button on reload
$(document).ready(function() {
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

$(".searchByIngredients").slideUp();


//Search Recipes Section

//To slide toggle rearch recipes function
$("#searchRecipe").click(function(){
  // $(".withoutSearch").slideToggle();
  $(".searchByIngredients").slideToggle();
});

var ingredientsAdded = [];

$(".ing1").click(function(){
  var ingredient = $(this).html();
  ingredientsAdded.push(ingredient);
  console.log(ingredientsAdded);
  $('#searchIcon').after('<button type="button" id="ing" class="btn btn-dark ingredient-remove">'+ingredient+'</button>');
});


$(".clear1").click(function(){
  $(".ingredient-remove").remove();
  ingredientsAdded = [];
  console.log(ingredientsAdded);
});


