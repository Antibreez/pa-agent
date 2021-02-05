(function() {
  const cancellationBtn = document.querySelectorAll('.contract-info__cancellation');

  if (!cancellationBtn[0]) {
    return;
  }

  const modal = document.getElementById('cancellation__modal');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function(item) {
    new Modal(item, modal);
  });


})();
