$(document).ready(function(){
  // $('.carousel').carousel('dist', 50);
   $('.carousel.carousel-slider').carousel({fullWidth: true});

  $("#nextProfile" ).click(function() {
    $('.carousel').carousel('next');
    $('.carousel').carousel('next', 1);
  });

  $("#prevProfile" ).click(function() {
    $('.carousel').carousel('prev');
    $('.carousel').carousel('prev', 1);
  });
});



        