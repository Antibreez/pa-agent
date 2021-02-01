(function() {

  $('.delivery-or-pickup.done').click(function() {
    $(this).find('.contract-info__delivered-adress').slideToggle();
    $(this).find('.contract-info__delivered-toggle').toggleClass('opened');
  });
})();
