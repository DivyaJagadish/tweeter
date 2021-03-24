
$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").keyup(function(event) {
    const length = $(this).val().length;
    console.log(length);
    const $formvariable =$(this).closest("form");// finds the closest form
    $formvariable.find(".counter").html(140-length);//finds the variable in the form
    if(length > 140) {
      $formvariable.find(".counter").css({"color":"red"});
    }
});
});