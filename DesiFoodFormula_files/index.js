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




//Search Recipes Section

//To slide toggle rearch recipes function
$(".searchByIngredients").slideUp();
$("#searchRecipe").click(function(){
  window.scroll(0, 0);
  $(".searchByIngredients").slideToggle();
});

var ingredientsAdded = [];

$(".ing1").click(function(){
  var ingredient = $(this).html();
  ingredientsAdded.push(ingredient);
  console.log(ingredientsAdded);
  $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">'+ingredient+'</button>');
});


$(".clear1").click(function(){
  $(".ingredient-remove").remove();
  ingredientsAdded = [];
  console.log(ingredientsAdded);
});

$("#addrecipebutton1").click(function() {
 
  var ingr = $("#ingred").val();
  alert(ingr);
  data.push(ingredientsAdded);
  $('#smth').after('<button type="button" id="ingg" class="btn btn-dark ingredient-remove">'+ingr+'</button>');
 
});

$("#removerecipebutton1").click(function(){

  $('#ingg').remove();
  data.pop();
});


//Moeed's work

var data = [];
var steps = [];

$("#addrecipebutton").click(function() {
 
    var ingr = $("#ingred").val();
    data.push(ingr);
 
    var htmlString =  '<button type="button"  style=" text-align:center;margin:0.3pc; background-color :"#318fb5" id="badgeRec" class="btn btn-primary  badgerecipe">' + ingr ;

  var element =   $('.list-group').after(htmlString);
   

});

$("#removerecipebutton").click(function(){

  $('#badgeRec').remove();
  data.pop();
});


$("#addstepsbutton").click(function() {
 
  var ingr = $("#steps").val();
  steps.push(ingr);
  
  var htmlString =  '<button type="button"  style=" text-align:center;margin:0.3pc" id="badgeStep" class="btn btn-primary  badgerecipe">' + ingr ;

var element =   $('#steps2List').append("<p id=badgeStep' >" + ingr + "</p>");
steps.push(ingr);
 

});


$("#removestepsbutton").click(function(){

  $('#badgeStep').remove();
 steps.pop();
});


  

 
    



 
  
  
                    


 
