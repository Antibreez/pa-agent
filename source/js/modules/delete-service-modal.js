(function() {
  const cancellationBtn = document.querySelector('.subscription-page__action-item--delete');

  if (!cancellationBtn) {
    return;
  }

  const modal = document.getElementById('delete-service__modal');

  new Modal(cancellationBtn, modal);
})();
