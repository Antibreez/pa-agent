(function() {
  const changeButton = document.querySelectorAll('.user-settings__change-phone');

  if (!changeButton[0]) {
    return;
  }

  const modal = document.getElementById('change-phone');

  if (!modal) {
    return;
  }

  changeButton.forEach(function(item) {
    new Modal(item, modal);
  });


})();
