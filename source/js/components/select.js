(function() {
  $('.select').select2();
  $('.select').on('select2:select', function (e) {
    $(this).addClass('picked');
});
})();
