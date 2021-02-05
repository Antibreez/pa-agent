(function() {
  $('.agents__users-btn').click(function() {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  })
})();
