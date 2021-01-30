(function() {
  const cancellationBtn = document.querySelector('.contract-info__cancellation');

  if (!cancellationBtn) {
    return;
  }

  const modal = document.getElementById('cancellation__modal');

  new Modal(cancellationBtn, modal);
})();
