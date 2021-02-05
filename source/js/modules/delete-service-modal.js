(function() {
  const cancellationBtn = document.querySelectorAll('.subscription-page__action-item--delete');

  if (!cancellationBtn[0]) {
    return;
  }

  const modal = document.getElementById('delete-service__modal');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function(item) {
    new Modal(item, modal);
  })

})();
