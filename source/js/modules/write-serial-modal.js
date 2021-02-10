(function() {
  const cancellationBtn = document.querySelectorAll('.contract-info__serial-btn');

  if (!cancellationBtn[0]) {
    return;
  }

  const modal = document.getElementById('write-serial');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function(item) {
    new Modal(item, modal);
  });


})();
