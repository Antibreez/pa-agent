(function() {

  $('.contract-info__delivered-toggle').click(function() {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();
