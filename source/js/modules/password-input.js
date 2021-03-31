(function() {
  const pass = document.querySelectorAll('.input-password');

  if (!pass[0]) {
    return;
  }

  $(document).on('click', '.input-icon--show-password', function(){
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(this).next().attr('type', 'text');
    } else {
      $(this).next().attr('type', 'password');
    }
  });
})();
