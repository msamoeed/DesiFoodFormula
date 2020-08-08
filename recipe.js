$(function () {
    $(".rateyo").rateYo({
      starWidth: "80px"
    }).on("rateyo.change", function (e, data) {
      var rating = data.rating;
      $(this).parent().find('.result').text('rating :'+ rating);
     });
  });

