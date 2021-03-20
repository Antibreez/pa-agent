(function() {
  const cancellationBtn = document.querySelectorAll('.account-creation__new');

  if (!cancellationBtn[0]) {
    return;
  }

  const modal = document.getElementById('account-creation');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function(item) {
    new Modal(item, modal);
  });


})();
