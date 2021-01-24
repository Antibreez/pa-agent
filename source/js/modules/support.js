(function() {
  $('.support__docs-btn').click(function() {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  })
})();
