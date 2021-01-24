(function() {
  $('.filters__btn').click(function() {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();
