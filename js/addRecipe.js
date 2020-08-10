
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

var element =   $('#steps2List').append("<p id='badgeStep' >" + ingr + "</p>");
steps.push(ingr);
 

});


$("#removestepsbutton").click(function(){

  $('#badgeStep').remove();
 steps.pop();
});
