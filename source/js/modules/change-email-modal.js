(function() {
  const changeButton = document.querySelectorAll('.user-settings__change-email');

  if (!changeButton[0]) {
    return;
  }

  const modal = document.getElementById('change-email');

  if (!modal) {
    return;
  }

  changeButton.forEach(function(item) {
    new Modal(item, modal);
  });


})();
