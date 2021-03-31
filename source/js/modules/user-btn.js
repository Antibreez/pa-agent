(function() {
  $('.header__user-btn').on('click', function(e) {
    if ($(this).is(e.target)) {
      $(this).toggleClass('active');
    }
  });

  $(document).on('mouseup', function(e) {
    var block = $('.header__user-btn');

    if (!block.is(e.target) && block.has(e.target).length === 0) {
      block.removeClass('active');
    }
  });
})();
